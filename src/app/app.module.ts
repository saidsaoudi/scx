import { HttpClientModule, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PrimeNGModule } from './prime-ng/prime-ng.module';
import { SharedModule } from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { CustomHttp } from './overrides/custom-http';
import { AuthErrorInterceptor } from './core/interceptors/auth/auth-error.interceptor';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PrimeNGModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // {
    //   provide: CustomHttp,
    //   useFactory: (handler: HttpHandler) => {
    //     return new CustomHttp(handler);
    //   },
    //   deps: [HttpHandler]
    // },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true},
    
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
