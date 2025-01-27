import { Component, Input, OnInit } from '@angular/core';
import { Consultation } from 'src/app/core/models/consultation';
import { Maladie } from 'src/app/core/models/maladie';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  //@ts-ignore
  @Input() consultation: Consultation
  //@ts-ignore
  primaryChief: Maladie
  secondarychief: Maladie[] = []
  constructor() { }

  ngOnInit(): void {
    if(this.consultation.chiefComplaintConsultations.find((item: any) => item.type == 'primary')){
      this.primaryChief = this.consultation.chiefComplaintConsultations.find((item: any) => item.type == 'primary').chiefComplaint
    }
    this.consultation.chiefComplaintConsultations.filter((item: any) => item.type == 'secondary').forEach((item: any) => {
      //@ts-ignore
      this.secondarychief.push(item.chiefComplaint)
    })
  }
  

  

}
