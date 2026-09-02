import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      let message = 'Something went wrong; please try again later.';
      if (error.error instanceof ErrorEvent) {
        message = `Client error: ${error.error.message}`;
      } else if (error.status === 0) {
        message = 'Network error: could not reach the API. Check your connection.';
      } else if (error.status >= 400) {
        message = `Request failed (${error.status}): ${error.statusText || error.message}`;
      }
      // Centralized logging - could be replaced by a LoggerService
      console.error('[HTTP Error]', { url: req.url, status: error.status, message, error });
      return throwError(() => new Error(message));
    }),
  );
};
