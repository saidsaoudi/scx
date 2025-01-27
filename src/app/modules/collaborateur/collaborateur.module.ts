import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CollaborateurRoutingModule } from './collaborateur-routing.module';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { ListeCollaborateursComponent } from './liste-collaborateurs/liste-collaborateurs.component';
import { reducers } from 'src/app/core/store/reducers';
import { environment } from 'src/environments/environment';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailCollaborateurComponent } from './detail-collaborateur/detail-collaborateur.component';
import { DetailCollaborateurLoaderComponent } from './loaders/detail-collaborateur-loader/detail-collaborateur-loader.component';
import { ListeCollaborateurLoaderComponent } from './loaders/liste-collaborateur-loader/liste-collaborateur-loader.component';
import { AjoutCollaborateurComponent } from './ajout-collaborateur/ajout-collaborateur.component';
import { ReactiveFormsModule } from '@angular/forms';
import { effects } from 'src/app/core/store/effects';


@NgModule({
  declarations: [
    CollaborateurComponent,
    ListeCollaborateursComponent,
    DetailCollaborateurComponent,
    DetailCollaborateurLoaderComponent,
    ListeCollaborateurLoaderComponent,
    AjoutCollaborateurComponent,
  ],
  imports: [
    CommonModule,
    CollaborateurRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNGModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ]
})
export class CollaborateurModule { }
