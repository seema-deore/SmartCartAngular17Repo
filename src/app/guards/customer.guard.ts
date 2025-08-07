import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Inject, inject } from '@angular/core';
export const customerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  
  const userRole = authService.getRole();
  return userRole === 'Customer';
};
