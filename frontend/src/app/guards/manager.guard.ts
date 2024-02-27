import { CanActivateFn, Router } from '@angular/router';

export const managerGuard: CanActivateFn = (route, state) => {
  const jwt = localStorage.getItem('token');
  let user: any = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
  }
  if (jwt && user && user.role === 'ROLE_MANAGER') {
    return true;
  }
  const router = new Router();
  router.navigate(['/']);
  return false;
};
