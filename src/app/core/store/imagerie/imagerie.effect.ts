import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { updatePagination } from '../pagination/pagination.action';
import { Paginator } from '../../models/paginator';
import { Router } from '@angular/router';
import { ImagerieService } from '../../services/imagerie/imagerie.service';
import { imagerieActionFailure, searchImagerie, searchImageriesSuccess } from './imagerie.action';


@Injectable()
export class ImageriesEffects {
    constructor(
        private actions$: Actions,
        private imagerieService: ImagerieService,
        private router: Router ,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  searchImagerie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchImagerie),
      mergeMap(({paginate, paginator, search}) => {
        return this.imagerieService.searchImagerie(paginate, paginator ? paginator : new Paginator, search).pipe(
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
              return searchImageriesSuccess({ payload, totalResults: res.totalResults });
            } else {
              console.error('Une Erreur est survenu !');
              return imagerieActionFailure({
                action: 'Fetching imageries',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                imagerieActionFailure({ action: 'Fetching imageries', error })
            );
          })
        );
      }),

    );
  });
}