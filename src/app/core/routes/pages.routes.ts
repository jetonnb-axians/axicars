import { Route } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { KmReportsComponent } from '../../pages/km-reports/km-reports.component';
import { CardatabaseComponent } from '../../pages/cardatabase/cardatabase.component';
import { CarrequetsComponent } from '../../pages/carrequets/carrequets.component';
import { DriversdatabaseComponent } from '../../pages/driversdatabase/driversdatabase.component';
import { DriverProfileComponent } from '../../pages/driver-profile/driver-profile.component';
import { CarDetailComponent } from '../../pages/car-detail/car-detail.component';
import { AdminGuard } from '..//../guards/admin.guard';

export default [
  {
    path: '',
    redirectTo: '/cardatabase',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'kmreports',
    component: KmReportsComponent,
  },
  {
    path: 'cardatabase',
    component: CardatabaseComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'carrequests',
    component: CarrequetsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'driversdatabase',
    component: DriversdatabaseComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'driver-profile/:id',
    component: DriverProfileComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'driversprofile',
    component: DriversdatabaseComponent,
    canActivate: [AdminGuard],
  },

  { path: 'car/:id', component: CarDetailComponent, canActivate: [AdminGuard] },
] as Route[];
