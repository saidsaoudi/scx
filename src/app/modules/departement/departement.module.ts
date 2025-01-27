import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementRoutingModule } from './departement-routing.module';
import { DepartementComponent } from './departement/departement.component';
import { ListeDepartementsComponent } from './liste-departements/liste-departements.component';


@NgModule({
  declarations: [
    DepartementComponent,
    ListeDepartementsComponent
  ],
  imports: [
    CommonModule,
    DepartementRoutingModule
  ]
})
export class DepartementModule { }
