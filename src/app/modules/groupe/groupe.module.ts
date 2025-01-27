import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupeRoutingModule } from './groupe-routing.module';
import { GroupeComponent } from './groupe/groupe.component';
import { ListeGroupesComponent } from './liste-groupes/liste-groupes.component';


@NgModule({
  declarations: [
    GroupeComponent,
    ListeGroupesComponent
  ],
  imports: [
    CommonModule,
    GroupeRoutingModule
  ]
})
export class GroupeModule { }
