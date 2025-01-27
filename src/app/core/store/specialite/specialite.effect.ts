import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { updatePagination } from '../pagination/pagination.action';
import { Router } from '@angular/router';
import { SpecialiteService } from '../../services/specialite/specialite.service';
import { searchSpecialite, searchSpecialitesSuccess, specialiteActionFailure } from './specialite.action';
import { Paginator } from '../../models/paginator';


@Injectable()
export class SpecialitesEffects {
    constructor(
        private actions$: Actions,
        private specialiteService: SpecialiteService,
        private router: Router ,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  searchSpecialites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchSpecialite),
      mergeMap(({paginate, paginator, search}) => {
        return this.specialiteService.searchSpecialite(paginate, paginator ? paginator : new Paginator, search).pipe(
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
              return searchSpecialitesSuccess({ payload, totalResults: res.totalResults });
            } else {
              console.error('Une Erreur est survenu !');
              return specialiteActionFailure({
                action: 'Fetching specialites',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                specialiteActionFailure({ action: 'Fetching specialites', error })
            );
          })
        );
      }),

    );
  });
}