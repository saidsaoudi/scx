import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TmsComponent } from './tms/tms.component';

const routes: Routes = [
  {path: '', component: TmsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TmsRoutingModule { }
