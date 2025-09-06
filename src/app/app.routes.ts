import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'customer/home',
    pathMatch: 'full',    
  },
   {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent),
  },
  {
    path: 'customer',
  
    loadChildren: () => import('./customer/customer.routes').then(m => m.customerRoutes),
  },
  
  {
    path: 'admin',
    canActivate:[authGuard],
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes),
  },
  
  // { path: '**', redirectTo: '' }
];

