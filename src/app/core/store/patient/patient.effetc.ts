import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { updatePagination } from '../pagination/pagination.action';
import { addPatient, addPatientSuccess, fetchConstantes, fetchConstantesSuccess, fetchConsultations, fetchConsultationsSuccess, fetchCurrentConsultations, fetchCurrentConsultationsSuccess, fetchMedicamentHitorique, fetchMedicamentHitoriqueSuccess, fetchOnePatient, fetchOnePatientsSuccess, fetchPatients, fetchPatientsSuccess, patientActionFailure, updatePatient, updatePatientSuccess } from './patient.action';
import { PatientService } from '../../services/patient/patient.service';
import { Paginator } from '../../models/paginator';
import { Router } from '@angular/router';


@Injectable()
export class PatientsEffects {
    constructor(
        private actions$: Actions,
        private patientService: PatientService,
        private router: Router ,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  getListPatients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchPatients),
      mergeMap(({paginate, paginator, search}) => {
        return this.patientService.getAllPatients(paginate, paginator ? paginator : new Paginator, search).pipe(
          map((res: any) => {
            if (res.results) {
              let payload = [];
              if(res.results){
                payload = res.results;
                this.store.dispatch(updatePagination({
                   currentPage: 10,
                   nextPage: 10,
                   pageSize: 10,
                   totalItems: 1
                  }));
              }else{
                payload = res.results
              }
              return fetchPatientsSuccess({ payload, totalResults: res.totalResults });
            } else {
              console.error('Une Erreur est survenu !');
              return patientActionFailure({
                action: 'Fetching patients',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                patientActionFailure({ action: 'Fetching patients', error })
            );
          })
        );
      }),

    );
  });
  getOnePatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOnePatient),
      mergeMap(({id}) => {
        return this.patientService.getOnePatient(id).pipe(
          map((res: any) => {
            if (res) {
                let payload = res
                
              return fetchOnePatientsSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return patientActionFailure({
                action: 'Fetching patients',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                patientActionFailure({ action: 'Fetching patients', error })
            );
          })
        );
      }),

    );
  });

  addPatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPatient),
      switchMap(({ payload }) => {
        return this.patientService.addPatient(payload).pipe(
          map((res: any) => {
            if (res) {
              const payload = res;
              return addPatientSuccess({ payload });
            } else {
              return patientActionFailure({
                action: 'Add new patient',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            return of(
              patientActionFailure({ action: 'Add new contact', error })
            );
          })
        );
      })
    );
  });

  updatePatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePatient),
      switchMap(({payload, id }) => {
        return this.patientService.updatePatient(payload, id).pipe(
          map((res: any) => {
            if (res) {
              const payload = res;
              return updatePatientSuccess({ payload, id });
            } else {
              return patientActionFailure({
                action: 'Update Patient',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            return of(
              patientActionFailure({ action: 'Update patient', error })
            );
          })
        );
      })
    );
  });

  fetchMedicamentHistorique$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchMedicamentHitorique),
      mergeMap(({id}) => {
        return this.patientService.getMedicamentHistorique(id).pipe(
          map((res: any) => {
            if (res) {
              let payload = {
                medicationHistory: [],
                actualPrescription: [],
              }
              payload.medicationHistory = res.medicationHistory
              payload.actualPrescription = res.actualPrescription
              return fetchMedicamentHitoriqueSuccess({ payload, idPatient: id });
            } else {
              console.error('Une Erreur est survenu !');
              return patientActionFailure({
                action: 'Fetching Historique',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                patientActionFailure({ action: 'Fetching Historique', error })
            );
          })
        );
      }),

    );
  });

  fetchConsultations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchConsultations),
      mergeMap(({id}) => {
        return this.patientService.getConsultations(id).pipe(
          map((res: any) => {
            if (res) {
                let payload = res.results
              return fetchConsultationsSuccess({ payload, idPatient: id });
            } else {
              console.error('Une Erreur est survenu !');
              return patientActionFailure({
                action: 'Fetching Consultations',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                patientActionFailure({ action: 'Fetching Consultations', error })
            );
          })
        );
      }),

    );
  });
  fetchCurrentConsultations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCurrentConsultations),
      mergeMap(({id}) => {
        return this.patientService.getCurrentConsultations(id).pipe(
          map((res: any) => {
            if (res) {
                let payload = res.results
              return fetchCurrentConsultationsSuccess({ payload, idPatient: id });
            } else {
              console.error('Une Erreur est survenu !');
              return patientActionFailure({
                action: 'Fetching Consultations',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                patientActionFailure({ action: 'Fetching Consultations', error })
            );
          })
        );
      }),

    );
  });

  fetchConstantes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchConstantes),
      mergeMap(({id}) => {
        return this.patientService.getConstantes(id).pipe(
          map((res: any) => {
            if (res) {
                let payload = res.results
              return fetchConstantesSuccess({ payload, idPatient: id });
            } else {
              console.error('Une Erreur est survenu !');
              return patientActionFailure({
                action: 'Fetching Constantes',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                patientActionFailure({ action: 'Fetching Consultations', error })
            );
          })
        );
      }),

    );
  });
}