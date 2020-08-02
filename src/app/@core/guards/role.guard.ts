import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppUserRole } from '../services/auth.service';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private roleService: RoleService, private router: Router) { }

  hasSomeRoles(roles: AppUserRole[]): Observable<boolean> {
    return this.roleService.hasSomeRoles(roles).pipe(
      tap(hasSomeRoles => {
        if (!hasSomeRoles) {
          this.router.navigate(['/']);
        }
      })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles: AppUserRole[] = next?.data?.roles ?? [];
    return this.hasSomeRoles(roles);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles: AppUserRole[] = next?.data?.roles ?? [];
    return this.hasSomeRoles(roles);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const roles: AppUserRole[] = route?.data?.roles ?? [];
    return this.hasSomeRoles(roles);
  }
}
