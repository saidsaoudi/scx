import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { updatePagination } from '../pagination/pagination.action';
import { Paginator } from '../../models/paginator';
import { Router } from '@angular/router';
import { AnalyseService } from '../../services/analyse/analyse.service';
import { analyseActionFailure, searchAnalyse, searchAnalysesSuccess } from './analyse.action';


@Injectable()
export class AnalysesEffects {
    constructor(
        private actions$: Actions,
        private analyseService: AnalyseService,
        private router: Router ,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  searchAnalyse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchAnalyse),
      mergeMap(({paginate, paginator, search}) => {
        return this.analyseService.searchAnalyse(paginate, paginator ? paginator : new Paginator, search).pipe(
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
              return searchAnalysesSuccess({ payload, totalResults: res.totalResults });
            } else {
              console.error('Une Erreur est survenu !');
              return analyseActionFailure({
                action: 'Fetching analyses',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                analyseActionFailure({ action: 'Fetching analyses', error })
            );
          })
        );
      }),

    );
  });
}