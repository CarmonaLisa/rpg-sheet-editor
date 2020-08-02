import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/@core/services';

@Directive({
  selector: '[appIsAuth]'
})
export class IsAuthDirective implements OnInit, OnDestroy {

  private subscription$: Subscription;

  @Input()
  private appIsAuth = true;

  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainer: ViewContainerRef,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscription$ = this.authService.isAuthenticathed().subscribe(loggedIn => {
      if (loggedIn === this.appIsAuth) {
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
