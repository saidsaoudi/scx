import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningComponent } from './planning/planning.component';
import { DisponibiliteComponent } from './disponibilite/disponibilite.component';
import { Disponiblev2Component } from './disponiblev2/disponiblev2.component';

const routes: Routes = [
  { path:'', component: PlanningComponent},
  { path:'planning', component: PlanningComponent},
  { path:'disponibilite', component: DisponibiliteComponent},
  { path:'disponibilitev2', component: Disponiblev2Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialisteRoutingModule { }
