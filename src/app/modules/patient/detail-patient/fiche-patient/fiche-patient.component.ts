
import { DialogService } from 'primeng/dynamicdialog';
import { ModifPatientComponent } from './modif-patient/modif-patient.component';

import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/core/models/patient';

@Component({
  selector: 'app-fiche-patient',
  templateUrl: './fiche-patient.component.html',
  styleUrls: ['./fiche-patient.component.scss'],
  providers: [DialogService]

})
export class FichePatientComponent implements OnInit {

  //@ts-ignore
  @Input() patient: Patient
  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  ModifDialog() {
    const ref = this.dialogService.open(ModifPatientComponent, {
      header: 'Modifier Patient',
      width: '70%',
      data: this.patient
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }

}
