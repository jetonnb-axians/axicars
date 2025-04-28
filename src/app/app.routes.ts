import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardatabaseComponent } from './pages/cardatabase/cardatabase.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {
  AuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { DriversdatabaseComponent } from './pages/driversdatabase/driversdatabase.component';
import { BaseComponent } from './layouts/base/base.component';

const redirectUnauthorizedToLanding = () =>
  redirectUnauthorizedTo(['auth', 'login']);

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./core/routes/auth.routes') },

  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding },
    loadChildren: () =>
      import('./core/routes/pages.routes').then((m) => m.default),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
