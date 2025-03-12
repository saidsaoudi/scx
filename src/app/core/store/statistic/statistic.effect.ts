import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { StatisticService } from '../../services/statistic/statistic.service';
import { createStatistic, createStatisticsSuccess, fetchMinMaxStatistics, fetchMinMaxtatisticsSuccess, fetchOneStatistic, fetchOneStatisticsSuccess, fetchStatistics, fetchStatisticsSuccess, statisticActionFailure, updateStatistic, updateStatisticsSuccess } from './statistic.action';

@Injectable()
export class StatisticsEffects {
    constructor(
        private actions$: Actions,
        private statisticService: StatisticService,
        // private _toast: ToastService,
        private store: Store
      ) { }

  
      createStatistic$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(createStatistic),
          mergeMap(({payload}) => {
            return this.statisticService.createStatistic(payload).pipe(
              map((res: any) => {
                if (res.success) {
                    let payload = res.payload
                  return createStatisticsSuccess({ payload });
                } else {
                  console.error('Une Erreur est survenu !');
                  return statisticActionFailure({
                    action: 'Creating statistics',
                    error: res.message,
                  });
                }
              }),
              catchError((error) => {
                console.error('Une Erreur est survenu ! 1');
                return of(
                    statisticActionFailure({ action: 'Creating statistics', error })
                );
              })
            );
          }),
    
        );
      }); 
      updateStatistic$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(updateStatistic),
          mergeMap(({payload}) => {
            return this.statisticService.updateStatistic(payload).pipe(
              map((res: any) => {
                if (res.success) {
                    let payload = res.payload
                    //@ts-ignore
                  return updateStatisticsSuccess({ payload });
                } else {
                  console.error('Une Erreur est survenu !');
                  return statisticActionFailure({
                    action: 'Updating statistics',
                    error: res.message,
                  });
                }
              }),
              catchError((error) => {
                console.error('Une Erreur est survenu ! 1');
                return of(
                    statisticActionFailure({ action: 'Updating statistics', error })
                );
              })
            );
          }),
    
        );
      }); 
  getListStatistics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchStatistics),
      mergeMap(({payload}) => {
        return this.statisticService.getAllStatistics(payload).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchStatisticsSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return statisticActionFailure({
                action: 'Fetching statistics',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                statisticActionFailure({ action: 'Fetching statistics', error })
            );
          })
        );
      }),

    );
  });
  getOneStatistic$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOneStatistic),
      mergeMap(({uuid}) => {
        return this.statisticService.getOneStatistic(uuid).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchOneStatisticsSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return statisticActionFailure({
                action: 'Fetching one statistics',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                statisticActionFailure({ action: 'Fetching one statistics', error })
            );
          })
        );
      }),

    );
  });
  getMinMaxStatistics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchMinMaxStatistics),
      mergeMap(({payload}) => {
        return this.statisticService.fetchMinMaxStatistics(payload).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchMinMaxtatisticsSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return statisticActionFailure({
                action: 'Fetching Min Max statistics',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                statisticActionFailure({ action: 'Fetching Min Max statistics', error })
            );
          })
        );
      }),

    );
  });
}