import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
export const adminRoutes: Routes = [
  {
    path: '',
    component:DashboardComponent,
    // canActivate: [adminGuard],
    children: [
      // {
      //   path: 'dashboard',
      //   loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
      // },
      {
        path: 'overview',
        loadComponent: () => import('./overview/overview.component').then(c => c.OverviewComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./product-management/product-management.component').then(c => c.ProductManagementComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./orders/orders.component').then(c => c.OrdersComponent)
      },
      {
        path:'categories',
        loadComponent:()=> import('./category-management/category-management.component').then(c => c.CategoryManagementComponent)
      },
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      }
    ]
  }
];
