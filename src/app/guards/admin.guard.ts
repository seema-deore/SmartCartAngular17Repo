import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  return true;
  // const userRole = this.authService.getRole();
  // return userRole === 'admin';
};
