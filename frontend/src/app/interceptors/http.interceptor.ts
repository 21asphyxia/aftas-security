import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('login') && !req.url.includes('register')) {
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
  }
  let router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      console.log('error', error);
      if (error.status === 401) {
        localStorage.clear();
        router.navigate(['/login']);
      }
      throw error;
    })
  );
};
