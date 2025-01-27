import { Component, OnInit } from '@angular/core';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-dialog-gynecoobstetricaux',
  templateUrl: './dialog-gynecoobstetricaux.component.html',
  styleUrls: ['./dialog-gynecoobstetricaux.component.scss']
})


export class DialogGynecoobstetricauxComponent implements OnInit {
  stateOptions: any[] = [{label: 'Régulier', value: 'off'}, {label: 'Irrégulier', value: 'on'}];
  date2: Date ;
  value: string = 'off';
  cities: City[] ;

  selectedCity: City ;
  constructor() { }
  
  ngOnInit() {
      this.cities = [
          { name: 'Avant 9 ans', code: 'NY' },
          { name: 'Avant 10 ans', code: 'RM' },
      ];
  }
}
