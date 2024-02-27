import { CanActivateFn, Router } from '@angular/router';

export const juryGuard: CanActivateFn = (route, state) => {
  const jwt = localStorage.getItem('token');
  let user: any = localStorage.getItem('member');
  if (user) {
    user = JSON.parse(user);
  }
  if (jwt && user && (user.role === 'ROLE_MANAGER' || user.role === 'ROLE_JURY')) {
    return true;
  }
  const router = new Router();
  router.navigate(['/login']);
  return false;
};
