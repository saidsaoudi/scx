import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { updatePagination } from '../pagination/pagination.action';
import { Paginator } from '../../models/paginator';
import { ProvinceService } from '../../services/province/province.service';
import { fetchOneProvince, fetchOneProvincesSuccess, fetchProvinces, fetchProvincesSuccess, provinceActionFailure } from './province.action';


@Injectable()
export class ProvincesEffects {
    constructor(
        private actions$: Actions,
        private provinceService: ProvinceService,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  getListProvinces$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchProvinces),
      mergeMap(({paginate, paginator, search}) => {
        return this.provinceService.getAllProvinces(paginate, paginator ? paginator : new Paginator, search).pipe(
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
              return fetchProvincesSuccess({ payload, totalResults: res.totalResults });
            } else {
              console.error('Une Erreur est survenu !');
              return provinceActionFailure({
                action: 'Fetching provinces',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                provinceActionFailure({ action: 'Fetching provinces', error })
            );
          })
        );
      }),

    );
  });
  getOneProvince$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOneProvince),
      mergeMap(({id}) => {
        return this.provinceService.getOneProvinces(id).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchOneProvincesSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return provinceActionFailure({
                action: 'Fetching provinces',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                provinceActionFailure({ action: 'Fetching provinces', error })
            );
          })
        );
      }),

    );
  });
}