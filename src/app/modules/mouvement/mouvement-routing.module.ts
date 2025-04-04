import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionComponent } from './reception/reception.component';
import { SortieComponent } from './sortie/sortie.component';

const routes: Routes = [
  {path: '', component:ReceptionComponent }, 
  {path: '', component:SortieComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MouvementRoutingModule { }
