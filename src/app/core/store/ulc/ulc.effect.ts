import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UlcService } from '../../services/ulc/ulc.service';
import { createUlc, createUlcsSuccess, fetchOneUlc, fetchOneUlcsSuccess, fetchUlcs, fetchUlcsSuccess, ulcActionFailure, updateUlc, updateUlcsSuccess } from './ulc.action';

@Injectable()
export class UlcsEffects {
    constructor(
        private actions$: Actions,
        private ulcService: UlcService,
        // private _toast: ToastService,
        private store: Store
      ) { }

  
      createUlc$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(createUlc),
          mergeMap(({payload}) => {
            return this.ulcService.createULC(payload).pipe(
              map((res: any) => {
                if (res.success) {
                    let payload = res.payload
                  return createUlcsSuccess({ payload });
                } else {
                  console.error('Une Erreur est survenu !');
                  return ulcActionFailure({
                    action: 'Creating ulcs',
                    error: res.message,
                  });
                }
              }),
              catchError((error) => {
                console.error('Une Erreur est survenu ! 1');
                return of(
                    ulcActionFailure({ action: 'Creating ulcs', error })
                );
              })
            );
          }),
    
        );
      }); 
      updateUlc$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(updateUlc),
          mergeMap(({payload}) => {
            return this.ulcService.updateULC(payload).pipe(
              map((res: any) => {
                if (res.success) {
                    let payload = res.payload
                    //@ts-ignore
                  return updateUlcsSuccess({ payload });
                } else {
                  console.error('Une Erreur est survenu !');
                  return ulcActionFailure({
                    action: 'Updating ulcs',
                    error: res.message,
                  });
                }
              }),
              catchError((error) => {
                console.error('Une Erreur est survenu ! 1');
                return of(
                    ulcActionFailure({ action: 'Updating ulcs', error })
                );
              })
            );
          }),
    
        );
      }); 
  getListUlcs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchUlcs),
      mergeMap(({payload}) => {
        return this.ulcService.getAllULCs(payload).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchUlcsSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return ulcActionFailure({
                action: 'Fetching ulcs',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                ulcActionFailure({ action: 'Fetching ulcs', error })
            );
          })
        );
      }),

    );
  });
  getOneUlc$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOneUlc),
      mergeMap(({uuid}) => {
        return this.ulcService.getOneULC(uuid).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchOneUlcsSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return ulcActionFailure({
                action: 'Fetching one ulcs',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                ulcActionFailure({ action: 'Fetching one ulcs', error })
            );
          })
        );
      }),

    );
  });
}