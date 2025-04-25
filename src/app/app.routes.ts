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

// const redirectUnauthorizedToLogin = () =>
//   redirectUnauthorizedTo(['/your-login']);
// const redirectLoggedInToItems = () => redirectLoggedInTo(['/your-dashboard']);

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./core/routes/auth.routes') },

  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  // },
  // {
  //   path: 'home',
  //   component: BaseComponent,
  // },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding },
    loadChildren: () =>
      import('./core/routes/pages.routes').then((m) => m.default),
  },
  // {
  //   path: 'driversdatabase',
  //   component: DriversdatabaseComponent,
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLanding },
  // },

  // {
  //   path: 'auth/login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'auth/signup',
  //   component: SignupComponent,
  // },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
