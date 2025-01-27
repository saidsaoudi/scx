import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeleExpertiseRoutingModule } from './tele-expertise-routing.module';
import { TeleExpertiseComponent } from './tele-expertise/tele-expertise.component';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { PeripheriquesAvanceComponent } from './tele-expertise/peripheriques-avance/peripheriques-avance.component';
import { PeripheriquesBaseComponent } from './tele-expertise/peripheriques-base/peripheriques-base.component';
import { PepistageComponent } from './tele-expertise/pepistage/pepistage.component';


@NgModule({
  declarations: [
    TeleExpertiseComponent,
    PeripheriquesAvanceComponent,
    PeripheriquesBaseComponent,
    PepistageComponent
  ],
  imports: [
    CommonModule,
    TeleExpertiseRoutingModule,
    PrimeNGModule,
    SharedModule,
    TabViewModule
  ]
})
export class TeleExpertiseModule { }
