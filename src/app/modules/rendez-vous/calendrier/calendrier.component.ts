import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, TimeScaleModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { defaultData } from './datasource';
import { Internationalization } from '@syncfusion/ej2-base';
import { RendezVousComponent } from '../../patient/detail-patient/rendez-vous/rendez-vous.component';
import { DialogRendezVousComponent } from './dialog-rendez-vous/dialog-rendez-vous.component';
import { RendezVous } from 'src/app/core/models/rendez-vous';
import { AppState } from 'src/app/core/store/app.states';
import { Store } from '@ngrx/store';
import { fetchRendezVous } from 'src/app/core/store/rendez-vous/rendez-vous.action';
import { selectRendezVousPayload } from 'src/app/core/store/rendez-vous/rendez-vous.selector';
import { Paginator } from 'src/app/core/models/paginator';


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
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss'],
  providers: [DialogService,DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class CalendrierComponent implements OnInit {
  rendezVous: RendezVous[] = []
  public startHour = '08:00';
  public endHour = '22:00';
  public timeFormat = 'HH:mm';

  stateOptions: any[] = [{label: 'Calendrier de rendez vous', value: 'RDV'}, {label: 'Disponibilié des spécialistes', value: 'SPECIALITY'}];

  typeCalendar: string = 'RDV';
  public selectedDate: Date = new Date();
  public timeScale: TimeScaleModel = {
      enable: true,
      interval: 20,
      slotCount: 2,
      majorSlotTemplate: '#majorSlotTemplate',
      minorSlotTemplate: '#minorSlotTemplate'
  };
  public eventSettings: EventSettingsModel = { dataSource: [] };
  public instance: Internationalization = new Internationalization();
  getMajorTime(date: Date): string {
      return this.instance.formatDate(date, { skeleton: 'Hm' });
  }
  getMinorTime(date: Date): string {
      return this.instance.formatDate(date, { skeleton: 'Hm' });
  }
  constructor(
    private dialogService: DialogService,
    private store: Store<AppState>,
    ) { }

  ngOnInit(): void {
    this.fetchRendezVous()
  }

  fetchRendezVous(){
    this.store.dispatch(fetchRendezVous({paginate: true, paginator: new Paginator()}));
    this.store.select(selectRendezVousPayload).subscribe(rendezVous => {
      this.rendezVous = rendezVous
      this.rendezVous.forEach(rdv => {
        //@ts-ignore
        this.eventSettings.dataSource.push({
          ...rdv,
          Id: rdv.id,
          Subject: rdv.reason,
          StartTime: rdv.startTime,
          EndTime: rdv.endTime,
          IsAllDay: false
        })
      })
    });
  }

  Rendevous() {
    const ref = this.dialogService.open(RendezVousComponent, {
      header: 'Station et la spécialité',
      width: '70%',
      data : {}
    });
    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }
  onPopupOpen(args: PopupOpenEventArgs): void {
    //@ts-ignore
    if(!args.data.id)
      return
    console.log('EVENT', args)
    const ref = this.dialogService.open(DialogRendezVousComponent, {
      // header: 'Station et la spécialité',
      width: '40%',
      data : args.data
    });
    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }
  
}
