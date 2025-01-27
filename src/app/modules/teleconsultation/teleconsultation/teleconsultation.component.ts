import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teleconsultation',
  templateUrl: './teleconsultation.component.html',
  styleUrls: ['./teleconsultation.component.scss']
})
export class TeleconsultationComponent implements OnInit {
  specialities = [
    {
      'title': 'Cardiologie',
      'icon': 'cardiologie.png'
    },
    {
      'title': 'Dermatologie',
      'icon': 'dermatologie.png'
    },
    {
      'title': 'ORL',
      'icon': 'ORL.png'
    },
    {
      'title': 'Pneumologie',
      'icon': 'pneumologie.png'
    },
    {
      'title': 'Ophtalmologie',
      'icon': 'ophtalmologie.png'
    },
    {
      'title': 'Endocrinologie',
      'icon': 'endocrinologie.png'
    },
    {
      'title': 'Pédiatrie',
      'icon': 'pediatrie.png'
    },
    
  ]
  responsiveOptions: any[];
  constructor() { }

  ngOnInit(): void {
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  filterBySpeciality(title: any){
    alert(title)
  }

}
