import { Route } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { KmReportsComponent } from "../../pages/km-reports/km-reports.component";

export default [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
    {
        path:'dashboard',
        component: DashboardComponent
    },
    {
        path:'kmreports',
        component: KmReportsComponent
    }
] as Route[];