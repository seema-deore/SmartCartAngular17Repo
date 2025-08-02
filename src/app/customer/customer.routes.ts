import { Routes } from '@angular/router';
import { customerGuard } from '../guards/customer.guard';

export const customerRoutes: Routes = [
  {
    path: '',
    // canActivate:[customerGuard],
    children: [
      {
        path: '/customer/home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
      },
      {
        path: '/customer/products',
        loadComponent: () => import('./product-list/product-list.component').then(c => c.ProductListComponent)
      },
      {
        path: '/customer/product/:id',
        loadComponent: () => import('./product-details/product-details.component').then(c => c.ProductDetailsComponent)
      },
      {
        path: '/customer/cart',
        loadComponent: () => import('./cart/cart.component').then(c => c.CartComponent)
      },
      {
        path: '/customer/checkout',
        loadComponent: () => import('./checkout/checkout.component').then(c => c.CheckoutComponent)
      }
    ]
  }
];
