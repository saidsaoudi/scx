import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';import { DepartementService } from '../../services/departement/departement.service';
import { departementActionFailure, fetchDepartements, fetchDepartementsSuccess, fetchOneDepartement, fetchOneDepartementsSuccess } from './departement.action';
;

@Injectable()
export class DepartementsEffects {
    constructor(
        private actions$: Actions,
        private departementService: DepartementService,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  getListDepartements$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchDepartements),
      mergeMap(({}) => {
        return this.departementService.getAllDepartements().pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchDepartementsSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return departementActionFailure({
                action: 'Fetching departements',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                departementActionFailure({ action: 'Fetching departements', error })
            );
          })
        );
      }),

    );
  });
  getOneDepartement$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOneDepartement),
      mergeMap(({uuid}) => {
        return this.departementService.getOneDepartement(uuid).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchOneDepartementsSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return departementActionFailure({
                action: 'Fetching departements',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                departementActionFailure({ action: 'Fetching departements', error })
            );
          })
        );
      }),

    );
  });
}