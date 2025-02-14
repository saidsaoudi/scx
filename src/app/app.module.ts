import { HttpClientModule, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PrimeNGModule } from './prime-ng/prime-ng.module';
import { SharedModule } from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { CustomHttp } from './overrides/custom-http';
import { AuthErrorInterceptor } from './core/interceptors/auth/auth-error.interceptor';
import { HeaderComponent } from './shared/layout/header/header.component';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { ContentSidebarComponent } from './shared/layout/sidebar/content-sidebar/content-sidebar.component';
import { TagComponent } from './shared/components/tag/tag.component';
import { StarComponent } from './shared/components/star/star.component';
import { GoBackComponent } from './shared/components/go-back/go-back.component';
import { ImageWithPreviewComponent } from './shared/components/image-with-preview/image-with-preview.component';
import { BooleanTagComponent } from './shared/components/boolean-tag/boolean-tag.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentSidebarComponent,
    BooleanTagComponent,
    TagComponent,
    StarComponent,
    GoBackComponent,
    ImageWithPreviewComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PrimeNGModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    LeafletModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true},
    
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
