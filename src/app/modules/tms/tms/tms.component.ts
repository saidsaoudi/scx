import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tms',
  standalone : false,
  templateUrl: './tms.component.html',
  styleUrl: './tms.component.scss'
})
export class TmsComponent implements OnInit{
  headerColumuns = [
    'Date de l’Anomalie',
    'Matricule du Camion',
    'Type d’Anomalie',
    'Description',
    'Conséquence'  
  ];
  date: Date[] | undefined;

  data: any;
  datatms : any;
  dataline: any;

  options: any;
  optionstms : any;
  optionsline : any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.data = {
            labels: ['Tanger','CASABLANCA-SETTAT','L’oriental', 'Fès-Meknès', 'RABAT-SALÉ-KÉNITRA', 'MARRAKECH-SAFI', 'BÉNI MELLAL-KHÉNIFRA','DAKHLA-OUEDED-DAHAB','LAÂYOUNE-SAKIA EL HAMRA','Guelmim oued noun','sOuSS-MASSA','DRÃA-TAFILALET'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    borderRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40,30,20,40,80,20]
                }
            ]
        };

        this.datatms = {
          labels: ['Camion 1','Camion 2','Camion 3', 'Camion 4', 'Camion 5', 'Camion 6','Camion 7'],
          datasets: [
              {
                label: 'My Second dataset',
                backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                borderRadius: 10,
                data: [48, 40, 19, 86, 27, 90,100]
            }
          ]
      };
      this.dataline = {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--red-500'),
                tension: 0.4
            }
        ]
    };

        this.options = {
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
        this.optionstms = {
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

      this.optionsline = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                display : false
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
    }
}
