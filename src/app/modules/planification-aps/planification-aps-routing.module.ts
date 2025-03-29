import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanificationApsComponent } from './planification-aps/planification-aps.component';

const routes: Routes = [
   {path: '', component:PlanificationApsComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanificationApsRoutingModule { }
