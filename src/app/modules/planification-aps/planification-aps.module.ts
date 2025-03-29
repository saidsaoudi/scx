import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanificationApsRoutingModule } from './planification-aps-routing.module';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { PlanificationApsComponent } from './planification-aps/planification-aps.component';


@NgModule({
  declarations: [PlanificationApsComponent],
  imports: [
    CommonModule,
    PlanificationApsRoutingModule,
    PrimeNGModule
  ]
})
export class PlanificationApsModule { }
