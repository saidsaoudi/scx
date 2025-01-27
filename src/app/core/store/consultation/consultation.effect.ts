import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Paginator } from '../../models/paginator';
import { Router } from '@angular/router';
import { addConsultation, addConsultationSuccess, consultationActionFailure, fetchConsultations, fetchConsultationsSuccess, fetchOneConsultation, fetchOneConsultationsSuccess, updateConsultation, updateConsultationSuccess } from './consultation.action';
import { ConsultationService } from '../../services/consultation/consultation.service';


@Injectable()
export class ConsultationsEffects {
    constructor(
        private actions$: Actions,
        private consultationService: ConsultationService,
        private router: Router ,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  getListConsultations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchConsultations),
      mergeMap(({paginate, paginator, search}) => {
        return this.consultationService.getAllConsultations(paginate, paginator ? paginator : new Paginator, search).pipe(
          map((res: any) => {
            if (res.results) {
              let payload = [];
              if(res.results){
                payload = res.results;
              }else{
                payload = res.results
              }
              return fetchConsultationsSuccess({ payload, totalResults: res.totalResults });
            } else {
              console.error('Une Erreur est survenu !');
              return consultationActionFailure({
                action: 'Fetching consultations',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                consultationActionFailure({ action: 'Fetching consultations', error })
            );
          })
        );
      }),

    );
  });
  getOneConsultation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOneConsultation),
      mergeMap(({id}) => {
        return this.consultationService.getOneConsultation(id).pipe(
          map((res: any) => {
            if (res) {
                let payload = res
              return fetchOneConsultationsSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return consultationActionFailure({
                action: 'Fetching consultations',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
              consultationActionFailure({ action: 'Fetching consultations', error })
            );
          })
        );
      }),

    );
  });
  addConsultation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addConsultation),
      switchMap(({ payload }) => {
        return this.consultationService.addConsultation(payload).pipe(
          map((res: any) => {
            if (res) {
              const payload = res;
              return addConsultationSuccess({ payload });
            } else {
              return consultationActionFailure({
                action: 'Add new consultation',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            return of(
                consultationActionFailure({ action: 'Add new consultation', error })
            );
          })
        );
      })
    );
  });
  updateConsultation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateConsultation),
      switchMap(({payload, id }) => {
        return this.consultationService.updateConsultation(payload, id).pipe(
          map((res: any) => {
            if (res) {
              const payload = res;
              return updateConsultationSuccess({ payload, id });
            } else {
              return consultationActionFailure({
                action: 'Update consultation',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            return of(
              consultationActionFailure({ action: 'Update consultation', error })
            );
          })
        );
      })
    );
  });
}