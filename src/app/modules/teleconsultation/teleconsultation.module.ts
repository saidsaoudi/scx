import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { TeleconsultationRoutingModule } from './teleconsultation-routing.module';
import { TeleconsultationComponent } from './teleconsultation/teleconsultation.component';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    TeleconsultationComponent
  ],
  imports: [
    CommonModule,
    TeleconsultationRoutingModule,
    PrimeNGModule,
    CarouselModule,
    CardModule
  ]
})
export class TeleconsultationModule { }
