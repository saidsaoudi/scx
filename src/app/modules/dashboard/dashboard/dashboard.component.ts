import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { map } from 'leaflet';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogTablbordComponent } from '../dialog-tablbord/dialog-tablbord.component';

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
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrls: ['./dashboard.component.scss'],
  providers: [DialogService]
})
export class DashboardComponent implements OnInit {
  regions: Region[] | undefined;
  selectedRegion: Region | undefined;

  province : Province[] | undefined;
  selectedProvince: Province | undefined;

  hopital : Hopital[] | undefined;
  selectedHopital: Hopital | undefined;
  rangeDates: Date[] | undefined;
  
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;
  constructor(
    private dialogService: DialogService,
  ) { }
  map: any;

  
  markerLocations = [
    {
      lng:-7.09262,
      lat:  31.791702,
      zoom: 10,
    },
  ];
  data: any;
  databar : any;
  databardouble : any;

  options: any;
  optionsdata: any;
  optionsdatadouble : any;

  ngAfterViewInit() {
    this.map = map('map').setView([33.589886,-7.603869 ], 6);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.addMarkers();
  }

  addMarkers() {
    const icon = L.icon({
      iconUrl:
        '../../../../assets/img/icons/marker.png',
      iconSize: [41, 41], // size of the icon
      shadowSize: [41, 41], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    this.markerLocations.forEach((t) => {
      L.marker([t.lat, t.lng], { icon }).addTo(this.map).bindPopup('Hi!!');
    });
  }
  ngOnInit() {
    this.regions = [
      { name: 'Grand Casablanca', code: 'GC' },
      { name: 'Chaouia-Ouardigha', code: 'CO' },
      { name: 'Fès-Boulemane', code: 'FB' },
      { name: 'Guelmim-Es Semara', code: 'GS' },
      { name: 'Meknès-Tafilalet', code: 'MT' }
  ];
  this.province = [
    { name: 'Casablanca', code: 'CO' },
    { name: 'Mohammédia', code: 'FB' },
    { name: 'Nouaceur', code: 'GC' },
    { name: 'Médiouna', code: 'GS' },
  ];
  this.hopital = [
    { name: 'Casablanca', code: 'CO' },
    { name: 'Mohammédia', code: 'FB' },
    { name: 'Nouaceur', code: 'GC' },
    { name: 'Médiouna', code: 'GS' },
  ];
   const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: '',
          data: [50, 47, 45, 39, 40, 46, 48],
          fill: true,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
          backgroundColor: '#d3e6ff',
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        x: {
          display: false
      },
        y: {
          display: false
        },
      },
    };

    //data bar

    this.databar = {
      labels: ['ELOXATINE', 'VIVALAN', 'MYNAZOL', 'NOCAND', 'GASTROLIBER', 'ZELDOX', 'AVT','HYDROXO','MUSARIL','CLAFORAN','RIFASONE','AMOXIL','AMOXIL','UNASYN','DILATOR','FORMOFTIL','UMILINE','GLEMA','XANTHIUM','GYNOMYK','FLUMAX','TRIFAX'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: [100, 95, 90, 85, 80, 75, 70,65,60,55,50,45,40,35,30,25,20,15,10,5,2,1]
          }
      ]
  };

  this.optionsdata = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          legend: {
            display: false
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }

      }
    };

    //chart bar double 
    this.databardouble = {
      labels: ['ELOXATINE', 'VIVALAN', 'MYNAZOL', 'NOCAND', 'GASTROLIBER', 'ZELDOX', 'AVT','HYDROXO','MUSARIL','CLAFORAN','RIFASONE','AMOXIL','AMOXIL','UNASYN','DILATOR','FORMOFTIL','UMILINE','GLEMA','XANTHIUM','GYNOMYK','FLUMAX','TRIFAX'],
      datasets: [
          {
              type: 'bar',
              label: 'Dataset 1',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              data: [50, 25, 12, 48, 90, 76, 42,21, 84, 24, 75, 37, 65, 34,60, 50, 40, 30, 20, 10,20,30]
          },
          {
              type: 'bar',
              label: 'Dataset 2',
              backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
              data: [21, 84, 24, 75, 37, 65, 34,50, 25, 12, 48, 90, 76, 42,5, 34,60, 50, 40, 30, 20, 10]
          }
      ]
  }; 

  this.optionsdatadouble = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          tooltip: {
              mode: 'index',
              intersect: false
          },
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              stacked: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              stacked: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };
  }

  DetailTablBoard() {
    const ref = this.dialogService.open(DialogTablbordComponent, {
      header: 'TAUX DE PÉREMPTION',
      width: '50%',
      data: {}
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }
}
