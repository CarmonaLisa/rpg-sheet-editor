import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUserRole, RoleService } from 'src/app/@core/services';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {

  private subscription$: Subscription;

  @Input()
  private appHasRole: AppUserRole[] = [];

  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainer: ViewContainerRef,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.subscription$ = this.roleService.hasSomeRoles(this.appHasRole).subscribe(hasRole => {
      if (hasRole) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
