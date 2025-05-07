import { Route } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { KmReportsComponent } from '../../pages/km-reports/km-reports.component';
import { CardatabaseComponent } from '../../pages/cardatabase/cardatabase.component';
import { CarrequetsComponent } from '../../pages/carrequets/carrequets.component';
import { DriversdatabaseComponent } from '../../pages/driversdatabase/driversdatabase.component';
import { DriverProfileComponent } from '../../pages/driver-profile/driver-profile.component';
import { CarDetailComponent } from '../../pages/car-detail/car-detail.component';
import { AdminGuard } from '..//../guards/admin.guard';
import { RedirectGuard } from '../../guards/redrict.guard';
import { MaintenanceComponent } from '../../pages/maintenance/maintenance.component';
import { DamageReportComponent } from '../../pages/damage-report/damage-report.component';
import { RequestNewCarComponent } from '../../pages/request-new-car/request-new-car.component';

export default [
  {
    path: '',
    canActivate: [RedirectGuard],
    component: DashboardComponent,
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
    path: 'maintenance',
    component: MaintenanceComponent,
  },
  {
    path: 'damage-report',
    component: DamageReportComponent,
  },
  {
    path: 'request-new-car',
    component: RequestNewCarComponent,
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
