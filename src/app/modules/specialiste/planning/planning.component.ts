import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, TimeScaleModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';import { L10n, setCulture } from '@syncfusion/ej2-base';
import { defaultData } from './datasource';
import { Internationalization } from '@syncfusion/ej2-base';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogRendevousComponent } from './dialog-rendevous/dialog-rendevous.component';

// setCulture('fr-BE');
// L10n.load({
//   'fr-BE': {
//     schedule: {
//       saveButton: 'Enregistrer',
//       editButton: 'Modifier',
//       cancelButton: 'Fermer',
//       deleteButton: 'Supprimer',
//       newEvent: 'Créer un événement',
//       moreDetails: 'Plus de détails',
//       today: "Aujourd'hui",
//       week: 'Semaine',
//       workWeek: 'Semaine Ouvrable',
//       month: 'Mois',
//       editEvent: "Modifier l'événement",
//       deleteEvent: "Supprimer l'événement",
//       deleteContent: 'Voulez-vous vraiment supprimer cet événement ?',
//       cancel: 'Annuler',
//       delete: 'Supprimer',
//       edit: 'Modifier',
//     },
//   },
// });
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
  providers: [DialogService,DayService, WeekService, WorkWeekService, MonthService, AgendaService]

})
export class PlanningComponent implements OnInit {

  stateOptions: any[] = [{label: 'Calendrier de rendez vous', value: 'off'}, {label: 'Disponibilié des spécialistes', value: 'on'}];

  value: string = 'off';
public selectedDate: Date = new Date(2023, 10, 24);
public timeScale: TimeScaleModel = {
    enable: true,
    interval: 20,
    slotCount: 2,
    majorSlotTemplate: '#majorSlotTemplate',
    minorSlotTemplate: '#minorSlotTemplate'
};
public eventSettings: EventSettingsModel = { dataSource: defaultData };
public instance: Internationalization = new Internationalization();
getMajorTime(date: Date): string {
    return this.instance.formatDate(date, { skeleton: 'hm' });
}
getMinorTime(date: Date): string {
    return this.instance.formatDate(date, { skeleton: 'hm' });
}
constructor(private dialogService: DialogService) { }

ngOnInit(): void {
}

Rendevous() {
  const ref = this.dialogService.open(DialogRendevousComponent, {
    header: 'Station et la spécialité',
    width: '70%',
    data : {}
  });
  ref.onClose.subscribe((data) => {
    console.log('Dialog closed with data:', data);
  });
}


}
