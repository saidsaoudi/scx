import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsManagementRoutingModule } from './alerts-management-routing.module';
import { AlertsManagementComponent } from './alerts-management/alerts-management.component';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    AlertsManagementComponent
  ],
  imports: [
    CommonModule,
    AlertsManagementRoutingModule,
    PrimeNGModule
  ]
})
export class AlertsManagementModule { }
