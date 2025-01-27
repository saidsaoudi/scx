import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialisteRoutingModule } from './specialiste-routing.module';
import { PlanningComponent } from './planning/planning.component';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule';
import {
  WeekService,
  MonthService,
  DragAndDropService,
} from '@syncfusion/ej2-angular-schedule';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogRendevousComponent } from './planning/dialog-rendevous/dialog-rendevous.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DisponibiliteComponent } from './disponibilite/disponibilite.component';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from 'src/app/shared/shared.module';
import { Disponiblev2Component } from './disponiblev2/disponiblev2.component';
import { DialogConfirmeComponent } from './disponiblev2/dialog-confirme/dialog-confirme.component';

@NgModule({
  declarations: [
    PlanningComponent,
    DialogRendevousComponent,
    DisponibiliteComponent,
    Disponiblev2Component,
    DialogConfirmeComponent
  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    ScheduleModule,
    SpecialisteRoutingModule,
    SelectButtonModule,
    AutoCompleteModule,
    CheckboxModule,
    SharedModule
  ],
  providers: [
    WeekService,
    MonthService,
    DragAndDropService,
  ],
})
export class SpecialisteModule { }
