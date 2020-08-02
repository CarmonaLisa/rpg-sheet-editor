import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUserRole, AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private authService: AuthService) { }

  hasSomeRoles(roles: AppUserRole[] = []): Observable<boolean> {
    return this.authService.user$.pipe(
      map(user => {
        if (!user) {
          return false;
        }

        if (!roles.length) {
          return true;
        }
        return user.roles.some(role => roles.includes(role));
      })
    );
  }
}
