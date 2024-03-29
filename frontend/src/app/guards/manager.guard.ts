import { CanActivateFn, Router } from '@angular/router';

export const managerGuard: CanActivateFn = (route, state) => {
  const jwt = localStorage.getItem('token');
  let user: any = localStorage.getItem('member');
  if (user) {
    user = JSON.parse(user);
  }
  const router = new Router();
  if (jwt && user && user.role === 'ROLE_MANAGER') {
    return true;
  }
  else if (jwt && user) {
    router.navigate(['/participations']);
    return false;
  }
  router.navigate(['/login']);
  return false;
};
