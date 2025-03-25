import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovisionnementRoutingModule } from './approvisionnement-routing.module';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { ListCommandesComponent } from './list-commandes/list-commandes.component';


@NgModule({
  declarations: [
    ListCommandesComponent
  ],
  imports: [
    CommonModule,
    ApprovisionnementRoutingModule,
    PrimeNGModule
  ]
})
export class ApprovisionnementModule { }
