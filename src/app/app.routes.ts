import { Routes } from '@angular/router';
import { BaseComponent } from './layouts/base/base.component';

export const routes: Routes = [
    {path:'', component:BaseComponent,  loadChildren: () => import('./core/routes/pages.routes')},
    {path:'auth', loadChildren: () => import('./core/routes/auth.routes')},
  
];
