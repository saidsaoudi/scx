import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventaireComponent } from './inventaire/inventaire.component';

const routes: Routes = [
     {path: '', component:InventaireComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaireRoutingModule { }
