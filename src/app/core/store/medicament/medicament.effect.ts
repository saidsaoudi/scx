import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { updatePagination } from '../pagination/pagination.action';
import { Paginator } from '../../models/paginator';
import { Router } from '@angular/router';
import { MedicamentService } from '../../services/medicament/medicament.service';
import { medicamentActionFailure, searchMedicament, searchMedicamentsSuccess } from './medicament.action';


@Injectable()
export class MedicamentsEffects {
    constructor(
        private actions$: Actions,
        private medicamentService: MedicamentService,
        private router: Router ,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  searchMedicaments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchMedicament),
      mergeMap(({paginate, paginator, search}) => {
        return this.medicamentService.searchMedicament(paginate, paginator ? paginator : new Paginator, search).pipe(
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
              return searchMedicamentsSuccess({ payload, totalResults: res.totalResults });
            } else {
              console.error('Une Erreur est survenu !');
              return medicamentActionFailure({
                action: 'Fetching medicaments',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                medicamentActionFailure({ action: 'Fetching medicaments', error })
            );
          })
        );
      }),

    );
  });
}