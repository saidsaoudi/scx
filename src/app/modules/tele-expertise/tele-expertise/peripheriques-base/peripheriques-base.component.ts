import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peripheriques-base',
  templateUrl: './peripheriques-base.component.html',
  styleUrls: ['./peripheriques-base.component.scss']
})
export class PeripheriquesBaseComponent implements OnInit {
  checked: boolean = false;
  stepIndex = 0;
  temperature = 30;
  systolique = 50;
  diastolique = 30;
  typeTension = 'Systolique';
  saturation = 50;
  taille = 40;
  poids = 2;
  imc = 0
  typeTaillePoids = 'Poids'
  categoriePoids = 'Normal'
  couleurPoids = '##84e1bc';
  glycemie = 0.5;
  rythmeCardiaque = 28;
  frequenceResp = 10;
  constructor() { }

  ngOnInit(): void {
  }

  changeTemperature(type: any){
    this.temperature = (type == 'plus') ? this.temperature+0.1 : this.temperature-0.1
    this.temperature = +this.temperature.toFixed(1)
    this.temperature = this.temperature < 30 ? 30 : this.temperature
  }
  changeSaturation(type: any){
    this.saturation = (type == 'plus') ? this.saturation+1 : this.saturation-1
    this.saturation = this.saturation < 50 ? 50 : this.saturation
  }
  changeTypeTension(){
    this.typeTension = this.typeTension == 'Systolique' ? 'Diastolique' : 'Systolique';
  }
  changeTension(type: any){
    if(this.typeTension == 'Systolique'){
      this.systolique = (type == 'plus') ? this.systolique+1 : this.systolique-1
      this.systolique = this.systolique < 50 ? 50 : this.systolique
    }else{
      this.diastolique = (type == 'plus') ? this.diastolique+1 : this.diastolique-1
      this.diastolique = this.diastolique < 30 ? 30 : this.diastolique
    }
  }
  changeTypeTaillePoids(){
    this.typeTaillePoids = this.typeTaillePoids == 'Poids' ? 'Taille' : 'Poids';
  }
  changeTaillePoids(type: any){
    if(this.typeTaillePoids == 'Poids'){
      this.poids = (type == 'plus') ? this.poids+0.1 : this.poids-0.1
      this.poids = +this.poids.toFixed(1)
      this.poids = this.poids < 2 ? 2 : this.poids
    }else{
      this.taille = (type == 'plus') ? this.taille+1 : this.taille-1
      this.taille = this.taille < 40 ? 40 : this.taille
    }
    this.calculateBMI()
  }
  changeGlycemie(type: any){
    this.glycemie = (type == 'plus') ? this.glycemie+0.1 : this.glycemie-0.1
    this.glycemie = +this.glycemie.toFixed(1)
    this.glycemie = this.glycemie < 0.5 ? 0.5 : this.glycemie
  }
  changeRythmeCardiaque(type: any){
    this.rythmeCardiaque = (type == 'plus') ? this.rythmeCardiaque+1 : this.rythmeCardiaque-1
    this.rythmeCardiaque = this.rythmeCardiaque < 28 ? 28 : this.rythmeCardiaque
  }
  changeFrequenceResp(type: any){
    this.frequenceResp = (type == 'plus') ? this.frequenceResp+1 : this.frequenceResp-1
    this.frequenceResp = this.frequenceResp < 10 ? 10 : this.frequenceResp
  }



// Function to calculate BMI and set weight category
calculateBMI() {
   // Constants for BMI category data
  const BMI_CATEGORY_DATA = [
    { range: [0, 18.5], category: 'Maigre', color: '#84e1bc' },
    { range: [18.5, 25], category: 'Normal', color: '#0e9f6e' },
    { range: [25, 30], category: 'Surpoids', color: '#ff5a1f' },
    { range: [30, 40], category: 'Obèse', color: '#f05252' },
    { range: [40, Infinity], category: 'Obèse Morbide', color: '#f05252' }
  ];
  const heightInMeters = this.taille / 100;
  this.imc = this.poids / (heightInMeters * heightInMeters);
  this.imc = +this.imc.toFixed(2);

  // Find the category and color based on BMI range
  const { category, color } = BMI_CATEGORY_DATA.find(item => this.imc >= item.range[0] && this.imc < item.range[1]) || {};
  
  this.categoriePoids = category || 'Unknown';
  this.couleurPoids = color || '#000000'; // Default color if category is unknown
}

}
