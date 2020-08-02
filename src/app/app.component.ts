import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave',
          style({ position: 'fixed', width: '100%' }),
          { optional: true }),
        group([
          query(':enter', [
            style({ opacity: 0 }),
            animate('0.25s ease-in-out',
              style({ opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            style({ opacity: 1 }),
            animate('0.25s ease-in-out',
              style({ opacity: 0 }))
          ], { optional: true }),
        ])
      ]),
    ])
  ]
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData;
  }
}
