import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthErrorInterceptor } from 'src/app/core/interceptors/auth/auth-error.interceptor';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PrimeNGModule  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true},
  ]
})
export class AuthModule { }
