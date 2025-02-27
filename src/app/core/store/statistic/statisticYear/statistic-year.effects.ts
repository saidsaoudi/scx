import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { StatisticYearService } from 'src/app/core/services/statisticYear/statistic-year.service';
import { createStatisticYear, createStatisticYearSuccess, fetchOneStatisticYear, fetchOneStatisticYearSuccess, fetchStatisticYear, fetchStatisticYearSuccess, statisticYearActionFailure, updateStatisticYear, updateStatisticYearSuccess } from './statistic-year.action';

@Injectable()
export class StatisticYearEffects {
    constructor(
        private actions$: Actions,
        private statisticYearService: StatisticYearService,
        // private _toast: ToastService,
        private store: Store
      ) { }

  
      createStatisticYear$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(createStatisticYear),
          mergeMap(({payload}) => {
            return this.statisticYearService.createStatistic(payload).pipe(
              map((res: any) => {
                if (res.success) {
                    let payload = res.payload
                  return createStatisticYearSuccess({ payload });
                } else {
                  console.error('Une Erreur est survenu !');
                  return statisticYearActionFailure({
                    action: 'Creating StatisticYear',
                    error: res.message,
                  });
                }
              }),
              catchError((error) => {
                console.error('Une Erreur est survenu ! 1');
                return of(
                    statisticYearActionFailure({ action: 'Creating StatisticYear', error })
                );
              })
            );
          }),
    
        );
      }); 
      updateStatisticYear$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(updateStatisticYear),
          mergeMap(({payload}) => {
            return this.statisticYearService.updateStatistic(payload).pipe(
              map((res: any) => {
                if (res.success) {
                    let payload = res.payload
                    //@ts-ignore
                  return updateStatisticYearSuccess({ payload });
                } else {
                  console.error('Une Erreur est survenu !');
                  return statisticYearActionFailure({
                    action: 'Updating StatisticYear',
                    error: res.message,
                  });
                }
              }),
              catchError((error) => {
                console.error('Une Erreur est survenu ! 1');
                return of(
                    statisticYearActionFailure({ action: 'Updating StatisticYear', error })
                );
              })
            );
          }),
    
        );
      }); 
  getListStatisticYear$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchStatisticYear),
      mergeMap(({payload}) => {
        return this.statisticYearService.getAllStatistics(payload).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchStatisticYearSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return statisticYearActionFailure({
                action: 'Fetching StatisticYear',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                statisticYearActionFailure({ action: 'Fetching StatisticYear', error })
            );
          })
        );
      }),

    );
  });
  getOneStatisticYear$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOneStatisticYear),
      mergeMap(({uuid}) => {
        return this.statisticYearService.getOneStatistic(uuid).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchOneStatisticYearSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return statisticYearActionFailure({
                action: 'Fetching one StatisticYear',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                statisticYearActionFailure({ action: 'Fetching one StatisticYear', error })
            );
          })
        );
      }),

    );
  });
}