import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { localStorageHelper } from 'src/app/helpers/localStorage.helper';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}
  private readonly TOKEN_KEY = 'token';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorageHelper.getItem(this.TOKEN_KEY);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
