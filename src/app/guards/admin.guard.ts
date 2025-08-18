import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
    const router = inject(Router);
    const userRole = authService.getRole();
    // const userRole= localStorage.getItem('role');
    
    if (userRole == 'Admin'){
      // router.navigate(['/customer/products']);
      return true;
    }
    else{
    router.navigate(['login']);
  return false;}
};
