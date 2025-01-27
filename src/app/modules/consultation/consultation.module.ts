import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationRoutingModule } from './consultation-routing.module';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/core/store/reducers';
import { effects } from 'src/app/core/store/effects';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConsultationComponent } from './consultation/consultation.component';
import { TabViewModule } from 'primeng/tabview';
import { MotifConsultationComponent } from './consultation/motif-consultation/motif-consultation.component';
import {ChipsModule} from 'primeng/chips';
import { CompteRenduDiagnosticComponent } from './consultation/compte-rendu-diagnostic/compte-rendu-diagnostic.component';
import { TraitementEncoursComponent } from './consultation/traitement-encours/traitement-encours.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { AntecedentsComponent } from './consultation/antecedents/antecedents.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssistantIaComponent } from './consultation/assistant-ia/assistant-ia.component';
import { DialogPersonnelsComponent } from './consultation/antecedents/dialog-personnels/dialog-personnels.component';
import { DialogFamiliauxComponent } from './consultation/antecedents/dialog-familiaux/dialog-familiaux.component';
import { DialogHabitudesToxiquesComponent } from './consultation/antecedents/dialog-habitudes-toxiques/dialog-habitudes-toxiques.component';
import { DialogAllergiquesComponent } from './consultation/antecedents/dialog-allergiques/dialog-allergiques.component';
import { ExamenCliniqueComponent } from './consultation/examen-clinique/examen-clinique.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import {NgStepperModule} from 'angular-ng-stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { PeripheriquesBaseComponent } from './consultation/examen-clinique/peripheriques-base/peripheriques-base.component';
import { PeripheriquesAvanceComponent } from './consultation/examen-clinique/peripheriques-avance/peripheriques-avance.component';
import { PepistageComponent } from './consultation/examen-clinique/pepistage/pepistage.component';
import { PanelModule } from 'primeng/panel';
import { DialogCloturerConsultationComponent } from './consultation/dialog-cloturer-consultation/dialog-cloturer-consultation.component';
import { PrescriptionComponent } from './consultation/prescription/prescription.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { DiabeteComponent } from './consultation/examen-clinique/pepistage/diabete/diabete.component';
import { DialogGynecoobstetricauxComponent } from './consultation/antecedents/dialog-gynecoobstetricaux/dialog-gynecoobstetricaux.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { CancerSeinComponent } from './consultation/examen-clinique/pepistage/cancer-sein/cancer-sein.component';
import { CancerUterusComponent } from './consultation/examen-clinique/pepistage/cancer-uterus/cancer-uterus.component';
import { HtaComponent } from './consultation/examen-clinique/pepistage/hta/hta.component';
import { CheckboxModule } from 'primeng/checkbox';
import { EcgComponent } from './consultation/examen-clinique/peripheriques-avance/ecg/ecg.component';
import { DermatoscopeComponent } from './consultation/examen-clinique/peripheriques-avance/dermatoscope/dermatoscope.component';
import { OtoscopeComponent } from './consultation/examen-clinique/peripheriques-avance/otoscope/otoscope.component';
import { EchographieComponent } from './consultation/examen-clinique/peripheriques-avance/echographie/echographie.component';
import { IriscopeComponent } from './consultation/examen-clinique/peripheriques-avance/iriscope/iriscope.component';
import { CameraMobileComponent } from './consultation/examen-clinique/peripheriques-avance/camera-mobile/camera-mobile.component';
import { ImageModule } from 'primeng/image';
import { DialogEcgComponent } from './consultation/examen-clinique/peripheriques-avance/ecg/dialog-ecg/dialog-ecg.component';
import { ListeGlobalComponent } from './consultation/compte-rendu-diagnostic/liste-global/liste-global.component';
import { PreviewComponent } from './consultation/preview/preview.component';
import { CarouselModule } from 'primeng/carousel';
import { StepPreviewComponent } from './consultation/preview/step-preview/step-preview.component';


@NgModule({
  declarations: [
    ConsultationComponent,
    MotifConsultationComponent,
    CompteRenduDiagnosticComponent,
    AntecedentsComponent,
    TraitementEncoursComponent,
    AssistantIaComponent,
    DialogPersonnelsComponent,
    DialogFamiliauxComponent,
    DialogHabitudesToxiquesComponent,
    DialogAllergiquesComponent,
    ExamenCliniqueComponent,
    PeripheriquesBaseComponent,
    PeripheriquesAvanceComponent,
    PepistageComponent,
    DialogCloturerConsultationComponent,
    PrescriptionComponent,
    DiabeteComponent,
    DialogGynecoobstetricauxComponent,
    CancerSeinComponent,
    CancerUterusComponent,
    HtaComponent,
    EcgComponent,
    DermatoscopeComponent,
    OtoscopeComponent,
    EchographieComponent,
    IriscopeComponent,
    CameraMobileComponent,
    DialogEcgComponent,
    ListeGlobalComponent,
    PreviewComponent,
    StepPreviewComponent,
  ],
  imports: [
    CommonModule,
    ConsultationRoutingModule,
    PrimeNGModule,
    SharedModule,
    TabViewModule,
    ChipsModule,
    CheckboxModule,
    ImageModule,
    CarouselModule,
    InputTextareaModule,
    AutoCompleteModule,
    SelectButtonModule,
    CalendarModule,
    RadioButtonModule,
    FormsModule,
    InputSwitchModule,
    ReactiveFormsModule,
    NgStepperModule,
    CdkStepperModule,
    InputNumberModule,
    PanelModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
})
export class ConsultationModule { }
