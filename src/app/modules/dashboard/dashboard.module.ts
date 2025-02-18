import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { DialogTablbordComponent } from './dialog-tablbord/dialog-tablbord.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DialogTablbordComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimeNGModule,
  ]
})
export class DashboardModule { }
