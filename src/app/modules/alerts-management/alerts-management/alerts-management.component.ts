import { Component } from '@angular/core';

interface Region {
  name: string;
  code: string;
}
interface Province {
  name: string;
  code: string;
}
interface Hopital {
  name: string;
  code: string;
}
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-alerts-management',
  standalone : false,
  templateUrl: './alerts-management.component.html',
  styleUrl: './alerts-management.component.scss'
})
export class AlertsManagementComponent {

  headerColumuns = [
    'Criticité',
    'Type alerte',
    'Produit',
    'Classe',
    'DCI',
    'Lieu',
    'Date et heure',
    'Status'  
  ];

  regions: Region[] | undefined;
  selectedRegion: Region | undefined;

  province : Province[] | undefined;
  selectedProvince: Province | undefined;

  hopital : Hopital[] | undefined;
  selectedHopital: Hopital | undefined;
  rangeDates: Date[] | undefined;

  items: any[] | undefined;

  selectedItem: any;

  suggestions: any[] ;
  date1: Date;
  date2: Date;
  toutes: string[] = [];
  search(event: AutoCompleteCompleteEvent) {
      this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }
}
