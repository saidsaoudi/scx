import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { updatePagination } from '../pagination/pagination.action';
import { Paginator } from '../../models/paginator';
import { Router } from '@angular/router';
import { MaladieService } from '../../services/maladie/maladie.service';
import { maladieActionFailure, searchMaladies, searchMaladiesSuccess } from './maladie.action';


@Injectable()
export class MaladiesEffects {
    constructor(
        private actions$: Actions,
        private maladieService: MaladieService,
        private router: Router ,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  searchMaladies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchMaladies),
      mergeMap(({paginate, paginator, search}) => {
        return this.maladieService.searchMaladie(paginate, paginator ? paginator : new Paginator, search).pipe(
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
              return searchMaladiesSuccess({ payload, totalResults: res.totalResults });
            } else {
              console.error('Une Erreur est survenu !');
              return maladieActionFailure({
                action: 'Fetching maladies',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                maladieActionFailure({ action: 'Fetching maladies', error })
            );
          })
        );
      }),

    );
  });
}