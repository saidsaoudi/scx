import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Patient } from 'src/app/core/models/patient';
import { AppState } from 'src/app/core/store/app.states';
import { fetchConstantes, fetchConsultations, fetchCurrentConsultations, fetchMedicamentHitorique, fetchOnePatient } from 'src/app/core/store/patient/patient.action';
import { selectLoadingOnePatient, selectOnePatient } from 'src/app/core/store/patient/patient.selector';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { ConfirmConsultationLocalDialogComponent } from './confirm-consultation-local-dialog/confirm-consultation-local-dialog.component';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.scss'],
  providers: [DialogService]
})
export class DetailPatientComponent implements OnInit {

  isLoading$ = this.store.select(selectLoadingOnePatient)
  patientId: any = null
  //@ts-ignore
  patient: Patient
  constructor(private route: ActivatedRoute, private store: Store<AppState>,private dialogService: DialogService, private router: Router) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.fetchPatient();

  }

  fetchPatient(){
    this.store.dispatch(fetchOnePatient({id: this.patientId}));
    this.store.select(selectOnePatient).subscribe(patient  => {
      //@ts-ignore
      this.patient = patient;
    })
    this.fetchMedicamentHistorique()
    this.fetchConsultations()
    this.fetchCurrentConsultations()
    this.fetchConstantes()

  }
  fetchMedicamentHistorique(){
    this.store.dispatch(fetchMedicamentHitorique({id: this.patientId}));

  }
  fetchConsultations(){
    this.store.dispatch(fetchConsultations({id: this.patientId}));

  }
  fetchCurrentConsultations(){
    this.store.dispatch(fetchCurrentConsultations({id: this.patientId}));

  }
  fetchConstantes(){
    this.store.dispatch(fetchConstantes({id: this.patientId}));
    

  }
  
  Rendevous() {
    const ref = this.dialogService.open(RendezVousComponent, {
      header: 'Station et la spécialité',
      width: '70%',
      data : this.patient
    });
    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }
  openConfirmDialog() {
    const ref = this.dialogService.open(ConfirmConsultationLocalDialogComponent, {
      header: 'Nouvelle consultation locale',
      width: '40%',
      data : this.patient
    });
    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }

  goToConsultation(){
    this.router.navigate(['/consultations', this.patient.currentConsultations[0].id]);
  }

}
