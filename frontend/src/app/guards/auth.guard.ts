import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const jwt = localStorage.getItem('token');

  if (jwt) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
