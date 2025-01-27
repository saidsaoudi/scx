import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendezVousRoutingModule } from './rendez-vous-routing.module';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule';
import {
  WeekService,
  MonthService,
  DragAndDropService,
} from '@syncfusion/ej2-angular-schedule';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogRendezVousComponent } from './calendrier/dialog-rendez-vous/dialog-rendez-vous.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from 'src/app/core/store/reducers';
import { effects } from 'src/app/core/store/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    CalendrierComponent,
    DialogRendezVousComponent
  ],
  imports: [
    CommonModule,
    RendezVousRoutingModule,
    ScheduleModule,
    PrimeNGModule,
    SelectButtonModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    WeekService,
    MonthService,
    DragAndDropService,
  ],
})
export class RendezVousModule { }
