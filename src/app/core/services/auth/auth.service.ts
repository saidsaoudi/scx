import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EndpointsConfig } from 'src/app/config';
import { localStorageHelper } from 'src/app/helpers/localStorage.helper';
import { Router } from '@angular/router';
import { CustomHttp } from 'src/app/overrides/custom-http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_API = EndpointsConfig.api.auth;
  private readonly TOKEN_KEY = 'token';
  private readonly STATION = 'stationId';
  private readonly CENTER = 'centerId';
  private readonly USER = 'user';

  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private http: CustomHttp,private router: Router) {
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }

  login(credentials: any): Observable<any> {
    return this.http.sendRequest(this.AUTH_API.login, credentials).pipe(
      map((response: any) => {
        localStorageHelper.setItem(this.TOKEN_KEY, response.tokens.accessToken)
        localStorageHelper.setItem(this.USER, response.data)
        localStorageHelper.setItem(this.STATION, credentials.stationId)
        localStorageHelper.setItem(this.CENTER, credentials.centerId)
        localStorageHelper.setItem(this.CENTER, credentials.centerId)
        this.userSubject.next(response.data);
        return response
      }),
      tap(() => {
        if (this.loggedIn()) {
          // Redirect to dashboard
          // this.router.navigate(['/dashboard']);
          window.location.href = '/patients'
        }
      })
    );
  }
  me(): Observable<any> {
    return this.http.sendRequest(this.AUTH_API.me).pipe(
      map((user: any) => {
        this.userSubject.next(user.payload);
        return user
      }),
      tap(() => {
        if (this.loggedIn()) {
          // Redirect to dashboard
          // this.router.navigate(['/dashboard']);
          window.location.href = '/patients'
        }
      }),
      catchError((err) => {
        this.logout();
        return 'err';
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.userSubject.next(null);
    window.location.reload();
  }

  getToken(): string | null {
    return localStorageHelper.getItem(this.TOKEN_KEY)
  }

  loggedIn(){
    return this.getToken() ? true : false;
  }

}
