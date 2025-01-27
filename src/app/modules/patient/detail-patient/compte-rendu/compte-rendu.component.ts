import { Component, Input, OnInit } from '@angular/core';
import { Consultation } from 'src/app/core/models/consultation';

@Component({
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.scss']
})
export class CompteRenduComponent implements OnInit {

  isDetailOpend = false;
  selectedConsultation: Consultation = new Consultation
  //@ts-ignore
  @Input() patient: Patient;
  constructor() { }

  ngOnInit(): void {
  }

  openDetailConsultation(consultation: Consultation){
    console.log('CONSULTATION', consultation)
    this.selectedConsultation = consultation;
    this.isDetailOpend = true;
  }
  closeDetailConsultation(){
    this.isDetailOpend = false;
  }

}
