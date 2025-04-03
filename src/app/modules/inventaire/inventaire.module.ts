import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventaireRoutingModule } from './inventaire-routing.module';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { InventaireComponent } from './inventaire/inventaire.component';


@NgModule({
  declarations: [
    InventaireComponent
  ],
  imports: [
    CommonModule,
    InventaireRoutingModule,
    PrimeNGModule
  ]
})
export class InventaireModule { }
