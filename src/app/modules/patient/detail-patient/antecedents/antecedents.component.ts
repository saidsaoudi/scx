import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/core/models/patient';

@Component({
  selector: 'app-antecedents',
  templateUrl: './antecedents.component.html',
  styleUrls: ['./antecedents.component.scss']
})
export class AntecedentsComponent implements OnInit {

  //@ts-ignore
  @Input() patient: Patient
  constructor() { }

  ngOnInit(): void {
  }

}
