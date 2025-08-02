import { CanActivateFn } from '@angular/router';

export const customerGuard: CanActivateFn = (route, state) => {
  return true;

  // const userRole = this.authService.getRole();
  // return userRole === 'customer';
};
