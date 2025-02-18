import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-tablbord',
  standalone : false,
  templateUrl: './dialog-tablbord.component.html',
  styleUrl: './dialog-tablbord.component.scss'
})
export class DialogTablbordComponent implements OnInit {


 
  headerColumuns = [
    'Produit',
    'Qté périmée',
    'N° de lot',
    'Date de péremtion',
    'Lieu'
  ];
  data: any;
  databar: any;

  options: any;
  optionsbar: any;

  constructor() { }

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

    this.databar = {
      labels: ['ELOXATINE', 'VIVALAN', 'MYNAZOL', 'NOCAND', 'GASTROLIBER', 'ZELDOX', 'AVT','HYDROXO','HYDROXO','CLAFORAN'],
      datasets: [
          {
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: [65, 59, 80, 81, 56, 55, 40,60,100,120]
          }
      ]
  };
  this.optionsbar = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
        legend: {
            display: false,
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

  }
}
