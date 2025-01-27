import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { ListPatientsComponent } from './list-patients/list-patients.component';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { AjoutPatientComponent } from './ajout-patient/ajout-patient.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/core/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from 'src/app/core/store/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';
import { TabViewModule } from 'primeng/tabview';
import { FichePatientComponent } from './detail-patient/fiche-patient/fiche-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { ModifPatientComponent } from './detail-patient/fiche-patient/modif-patient/modif-patient.component';
import { AntecedentsComponent } from './detail-patient/antecedents/antecedents.component';
import { ConstantesComponent } from './detail-patient/constantes/constantes.component';
import { CompteRenduComponent } from './detail-patient/compte-rendu/compte-rendu.component';
import { DetailComponent } from './detail-patient/compte-rendu/detail/detail.component';
import { TableModule } from 'primeng/table';
import { RendezVousComponent } from './detail-patient/rendez-vous/rendez-vous.component';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { ConfirmConsultationLocalDialogComponent } from './detail-patient/confirm-consultation-local-dialog/confirm-consultation-local-dialog.component';




@NgModule({
  declarations: [
    ListPatientsComponent,
    AjoutPatientComponent,
    DetailPatientComponent,
    FichePatientComponent,
    ModifPatientComponent,
    AntecedentsComponent,
    ConstantesComponent,
    CompteRenduComponent,
    DetailComponent,
    RendezVousComponent,
    ConfirmConsultationLocalDialogComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    PrimeNGModule,
    TableModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TabViewModule,
    ReactiveFormsModule,
    DialogModule,
    DynamicDialogModule,
    CalendarModule,
    AutoCompleteModule,
    PanelModule
  ]
})
export class PatientModule { }
