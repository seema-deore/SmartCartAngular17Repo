import { Routes } from '@angular/router';
import { customerGuard } from '../guards/customer.guard';

export const customerRoutes: Routes = [
 {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
      { path: 'products', canActivate: [customerGuard],
        loadComponent: () => import('./product-list/product-list.component').then(c => c.ProductListComponent) },
      { path: 'product-details', canActivate: [customerGuard],
        loadComponent: () => import('./product-details/product-details.component').then(c => c.ProductDetailsComponent) },
      { path: 'cart',canActivate: [customerGuard],
         loadComponent: () => import('./cart/cart.component').then(c => c.CartComponent) },
      { path: 'checkout', canActivate: [customerGuard],
        loadComponent: () => import('./checkout/checkout.component').then(c => c.CheckoutComponent) },
    //   { path: 'login', loadComponent: () => import('../auth/login/login.component').then(c => c.LoginComponent) },
    //   { path: 'register', loadComponent: () => import('../auth/register/register.component').then(c => c.RegisterComponent) }
    // 
    ]
  }
];
