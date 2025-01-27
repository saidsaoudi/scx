import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(){}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: () => null,
        error: (error: HttpErrorResponse) => {
          // if(error.status == 401){
          //   this.authService.logout()
          // }
        },
      })
    );
  }
}