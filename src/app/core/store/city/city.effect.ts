import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { updatePagination } from '../pagination/pagination.action';
import { Paginator } from '../../models/paginator';
import { CityService } from '../../services/city/city.service';
import { cityActionFailure, fetchCities, fetchCitiesSuccess, fetchOneCity, fetchOneCitySuccess } from './city.action';


@Injectable()
export class CitiesEffects {
    constructor(
        private actions$: Actions,
        private cityService: CityService,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  getListCities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCities),
      mergeMap(({paginate, paginator, search}) => {
        return this.cityService.getAllCities(paginate, paginator ? paginator : new Paginator, search).pipe(
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
              return fetchCitiesSuccess({ payload, totalResults: res.totalResults });
            } else {
              console.error('Une Erreur est survenu !');
              return cityActionFailure({
                action: 'Fetching cities',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                cityActionFailure({ action: 'Fetching cities', error })
            );
          })
        );
      }),

    );
  });
  getOneCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOneCity),
      mergeMap(({id}) => {
        return this.cityService.getOneCity(id).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchOneCitySuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return cityActionFailure({
                action: 'Fetching cities',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                cityActionFailure({ action: 'Fetching cities', error })
            );
          })
        );
      }),

    );
  });
}