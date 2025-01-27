import { Component, Input, OnInit } from '@angular/core';
import { Constante } from 'src/app/core/models/constante';
import { Patient } from 'src/app/core/models/patient';

@Component({
  selector: 'app-constantes',
  templateUrl: './constantes.component.html',
  styleUrls: ['./constantes.component.scss']
})
export class ConstantesComponent implements OnInit {

  //@ts-ignore
  @Input() patient: Patient
  constantes: Constante[] = []
  headers: any[] = [];
  data: any;
  constructor() { }

  ngOnInit(): void {
    this.constantes = this.patient.vitalSigns
    console.log('PATIENT', this.constantes)
    this.initConstateData()
  }
  verticalHeaders = ['Poids(kg)', 'Taille(m)','IMC  (Kg/m²)  ', 'Pression systolique(mmHg)', 'Pression diastolique(mmHg)','Fréquence cardiaque(Batt/min)',
                      'Fréquence respiratoire(Cycles/min)', 'Température(°C)', 'Saturation O2(%)', 'Glycémie(g/l)'];
  


  initConstateData(){
    let weight = new Array();
    let height = new Array();
    let sys = new Array();
    let dia = new Array();
    let pulse = new Array();
    let respiratoryRythm = new Array();
    let temperature = new Array();
    let spo2 = new Array();
    let bloodSugar = new Array();
    this.constantes.forEach((item:any) => {
      this.headers.push(item.createdAt)
      weight.push(item.weight)
      height.push(item.height)
      sys.push(item.sys)
      dia.push(item.dia)
      pulse.push(item.pulse)
      respiratoryRythm.push(item.respiratoryRythm)
      temperature.push(item.temperature)
      spo2.push(item.spo2)
      bloodSugar.push(item.bloodSugar)
    })
    //@ts-ignore
    this.data = new Array(weight, height, sys, dia, pulse, respiratoryRythm, temperature, spo2, bloodSugar)
  }

}
