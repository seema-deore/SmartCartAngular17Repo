import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const customerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userRole = authService.getRole();
  // const userRole= localStorage.getItem('role');
  console.log(userRole);
  if (userRole == 'Customer'){    
    return true;
  }
  if(userRole == 'User'){
    router.navigate(['login']);
    return false;
  }
  else
    return false;
};
