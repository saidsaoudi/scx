import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppState } from 'src/app/core/store/app.states';
import { addConsultation } from 'src/app/core/store/consultation/consultation.action';
import { selectNewConsultation, selectStatusConsultations } from 'src/app/core/store/consultation/consultation.selector';
import { localStorageHelper } from 'src/app/helpers/localStorage.helper';

@Component({
  selector: 'app-confirm-consultation-local-dialog',
  templateUrl: './confirm-consultation-local-dialog.component.html',
  styleUrls: ['./confirm-consultation-local-dialog.component.scss']
})
export class ConfirmConsultationLocalDialogComponent implements OnInit {

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToConsultation(){
    
    let userData = localStorageHelper.getItem('user');
    if(!userData.user.doctor)
      return

    let payload = {
      "patientId": this.config.data.id,
      "stationId": localStorageHelper.getItem('stationId'),
      "doctorId": userData.user.doctor.id,
      "isLocal": true,
      "stepsNumber": 8
    }

    this.store.dispatch(addConsultation({payload}));
    this.store.select(selectStatusConsultations).subscribe((status) => {
      if (status == 'SUCCESS') {
        this.store.select(selectNewConsultation).subscribe((consultation) => {
            this.ref.close();
            this.router.navigate(['/consultations', consultation.id]);
        });
      }
    });
    
}

}
