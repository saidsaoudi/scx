import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutCollaborateurComponent } from './ajout-collaborateur/ajout-collaborateur.component';
import { DetailCollaborateurComponent } from './detail-collaborateur/detail-collaborateur.component';
import { ListeCollaborateursComponent } from './liste-collaborateurs/liste-collaborateurs.component';

const routes: Routes = [
  { path:'', component: ListeCollaborateursComponent},
  { path:'detail/:uuid', component: DetailCollaborateurComponent},
  { path:'add', component: AjoutCollaborateurComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaborateurRoutingModule { }
