import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeleconsultationComponent } from './teleconsultation/teleconsultation.component';

const routes: Routes = [
  {path: '', component : TeleconsultationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeleconsultationRoutingModule { }
