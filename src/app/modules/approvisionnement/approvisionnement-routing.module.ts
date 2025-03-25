import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCommandesComponent } from './list-commandes/list-commandes.component';

const routes: Routes = [
   {path: '', component:ListCommandesComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovisionnementRoutingModule { }
