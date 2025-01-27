import { AjoutPatientComponent } from './ajout-patient/ajout-patient.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';
import { DetailComponent } from './detail-patient/compte-rendu/detail/detail.component';

const routes: Routes = [
  { path:'', component: ListPatientsComponent},
  {path: 'ajout-patient', component : AjoutPatientComponent},
  {path: 'detail-compte/:id', component : DetailComponent},
  {path: 'detail/:id', component : DetailPatientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
