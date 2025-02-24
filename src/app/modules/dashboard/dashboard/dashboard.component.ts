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
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                },
                {
                    label: 'Trow Dataset',
                    data: [15, 20, 60, 17, 90, 30, 93],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--yellow-500'),
                    tension: 0.4
                },
                {
                  label: 'four Dataset',
                  data: [62, 51, 33, 65, 80, 40, 12],
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--purple-500'),
                  tension: 0.4
              },
              {
                label: 'five Dataset',
                data: [100, 30, 50, 70, 55, 33, 81],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--rose-500'),
                tension: 0.4
              },
              {
                label: '6 Dataset',
                data: [120, 90, 70, 33, 15, 17, 25],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--stone-500'),
                tension: 0.4
              },
              {
                label: '7 Dataset',
                data: [58, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '8 Dataset',
                data: [58, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '9 Dataset',
                data: [120, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '10 Dataset',
                data: [26, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '11 Dataset',
                data: [69, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '12 Dataset',
                data: [23, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '12 Dataset',
                data: [23, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '13 Dataset',
                data: [96, 35, 132, 65, 53, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '14 Dataset',
                data: [120, 99, 85, 65, 32, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '15 Dataset',
                data: [20, 15, 150, 88, 15, 23, 123],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '16 Dataset',
                data: [56, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '17 Dataset',
                data: [88, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '18 Dataset',
                data: [192, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '19 Dataset',
                data: [165, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              },
              {
                label: '20 Dataset',
                data: [215, 35, 120, 65, 15, 23, 77],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                tension: 0.4
              }
            ]
  };

  this.optionsdata = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
        legend: {
            labels: {
                color: textColor
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: textColorSecondary
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
