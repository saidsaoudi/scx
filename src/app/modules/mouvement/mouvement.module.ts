import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MouvementRoutingModule } from './mouvement-routing.module';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { ReceptionComponent } from './reception/reception.component';
import { SortieComponent } from './sortie/sortie.component';


@NgModule({
  declarations: [
    ReceptionComponent,
    SortieComponent
  ],
  imports: [
    CommonModule,
    MouvementRoutingModule,
    PrimeNGModule
  ]
})
export class MouvementModule { }
