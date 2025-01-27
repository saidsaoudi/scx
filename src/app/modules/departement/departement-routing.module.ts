import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeDepartementsComponent } from './liste-departements/liste-departements.component';

const routes: Routes = [
  {path: '', component: ListeDepartementsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartementRoutingModule { }
