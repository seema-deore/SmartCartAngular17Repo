import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    // canActivate: [adminGuard],
    children: [
      {
        path: '/admin/dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: '/admin/products',
        loadComponent: () => import('./product-management/product-management.component').then(c => c.ProductManagementComponent)
      },
      {
        path: '/admin/orders',
        loadComponent: () => import('./orders/orders.component').then(c => c.OrdersComponent)
      }
    ]
  }
];
