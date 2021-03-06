import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private auth: AuthService, private router: Router) { }

  isAuthenticated(notAuthenticathed: boolean = false, redirecting: Array<string> = ['/']): Observable<boolean> {
    return this.auth.isAuthenticathed().pipe(
      map(auth => notAuthenticathed !== auth),
      tap(auth => {
        if (!auth) {
          this.router.navigate(redirecting);
        }
      })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const notAuthenticathed: boolean = next?.data?.notAuthenticathed;
    const redirecting: Array<string> = next?.data?.redirecting ? next.data.redirecting : ['/'];
    return this.isAuthenticated(notAuthenticathed, redirecting);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const notAuthenticathed: boolean = next?.data?.notAuthenticathed;
    const redirecting: Array<string> = next?.data?.redirecting ? next.data.redirecting : ['/'];
    return this.isAuthenticated(notAuthenticathed, redirecting);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const notAuthenticathed: boolean = route?.data?.notAuthenticathed;
    return this.isAuthenticated(notAuthenticathed);
  }
}
