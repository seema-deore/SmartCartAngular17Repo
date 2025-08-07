import { Routes } from '@angular/router';
import { customerGuard } from '../guards/customer.guard';

export const customerRoutes: Routes = [
  {
    path: '',
    // canActivate:[customerGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./product-list/product-list.component').then(c => c.ProductListComponent)
      },
      {
        //path: 'product/:productId', // route not working, pass object instead
        path: 'product-details',
        loadComponent: () => import('./product-details/product-details.component').then(c => c.ProductDetailsComponent)
      }, 
      
      {
        path: 'cart',
        loadComponent: () => import('./cart/cart.component').then(c => c.CartComponent)
      },
      {
        path: 'checkout',
        loadComponent: () => import('./checkout/checkout.component').then(c => c.CheckoutComponent)
      }
    ]
  }
];
