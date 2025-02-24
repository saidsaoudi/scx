import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsManagementComponent } from './alerts-management/alerts-management.component';

const routes: Routes = [
  {path: '', component:AlertsManagementComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsManagementRoutingModule { }
