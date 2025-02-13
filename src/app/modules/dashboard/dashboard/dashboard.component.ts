import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  data: any;
  databar : any;
  databardouble : any;

  options: any;
  optionsdata: any;
  optionsdatadouble : any;

  ngOnInit() {
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

}
