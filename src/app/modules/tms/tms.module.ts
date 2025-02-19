import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TmsRoutingModule } from './tms-routing.module';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { TmsComponent } from './tms/tms.component';


@NgModule({
  declarations: [
    TmsComponent
  ],
  imports: [
    CommonModule,
    TmsRoutingModule,
    PrimeNGModule
  ]
})
export class TmsModule { }
