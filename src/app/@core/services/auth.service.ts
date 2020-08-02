import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth, User } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export enum AppUserRole {
  guest = 'guest',
  admin = 'admin'
}

export interface AppUser {
  roles: AppUserRole[];
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<AppUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => user ? this.afs.doc<AppUser>(`users/${user.uid}`).valueChanges() : of(null))
    );
  }

  private updateUserData(user: User): void {
    this.afs.doc(`users/${user.uid}`).get().subscribe((document) => {
      if (!document.exists) {
        this.afs.doc(`users/${user.uid}`).set({
          roles: [AppUserRole.guest],
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
        }, { merge: true });
      }
    });
  }

  async googleSignin(): Promise<void> {
    const credential = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    this.updateUserData(credential.user);
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  isAuthenticathed(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user)
    );
  }
}
