import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeGroupesComponent } from './liste-groupes/liste-groupes.component';

const routes: Routes = [
  {path: '', component: ListeGroupesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupeRoutingModule { }
