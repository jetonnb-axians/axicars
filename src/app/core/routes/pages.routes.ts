import { Route } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { KmReportsComponent } from "../../pages/km-reports/km-reports.component";
import { CardatabaseComponent } from "../../pages/cardatabase/cardatabase.component";
import { CarrequetsComponent } from "../../pages/carrequets/carrequets.component";
import { DriversdatabaseComponent } from "../../pages/driversdatabase/driversdatabase.component";

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
    },
    {
        path:'cardatabase',
        component: CardatabaseComponent
    },
    {
        path:'carrequests',
        component: CarrequetsComponent
    },
    {
        path:'driversdatabase',
        component: DriversdatabaseComponent
    }
] as Route[];