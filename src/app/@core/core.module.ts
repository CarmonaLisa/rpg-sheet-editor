import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AuthGuard, RoleGuard } from './guards';
import { AuthService, RoleService } from './services';

const FIREBASE = [
  AngularFirestoreModule,
  AngularFireAnalyticsModule,
  ScreenTrackingService
];

const SERVICES = [
  AuthService,
  RoleService
];

const GUARDS = [
  AuthGuard,
  RoleGuard
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {}),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    ...FIREBASE,

    ...SERVICES,
    ...GUARDS
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded the import must be in the AppModule only.');
    }
  }
}
