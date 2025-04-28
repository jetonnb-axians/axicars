import { Route } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { SignupComponent } from '../../auth/signup/signup.component';
import { ForgotPasswordComponent } from '../../auth/forgot-password/forgot-password.component';

export default [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },

  { path: 'forgot-password', component: ForgotPasswordComponent },
] as Route[];
