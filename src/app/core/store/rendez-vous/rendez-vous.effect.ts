import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { addRendezVous, addRendezVousSuccess, fetchRendezVous, fetchRendezVousSuccess, rendezVousActionFailure } from './rendez-vous.action';
import { RendezVousService } from '../../services/rendez-vous/rendez-vous.service';
import { Paginator } from '../../models/paginator';


@Injectable()
export class RendezVousEffect {
    constructor(
        private actions$: Actions,
        private rendezVousService: RendezVousService,
        private router: Router ,
        // private _toast: ToastService,
        private store: Store
      ) { }


    getListRendezVous$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(fetchRendezVous),
        mergeMap(({paginate, paginator}) => {
        return this.rendezVousService.getAllRendezVous(paginate, paginator ? paginator : new Paginator).pipe(
            map((res: any) => {
            if (res.results) {
                let payload = [];
                if(res.results){
                payload = res.results
                }else{
                payload = res.results
                }
                return fetchRendezVousSuccess({ payload, totalResults: res.totalResults });
            } else {
                console.error('Une Erreur est survenu !');
                return rendezVousActionFailure({
                action: 'Fetching rendez-vous',
                error: res.message,
                });
            }
            }),
            catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                rendezVousActionFailure({ action: 'Fetching rendez-vous', error })
            );
            })
        );
        }),

    );
    });

  addRendezVous$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addRendezVous),
      switchMap(({ payload }) => {
        return this.rendezVousService.addRendezVous(payload).pipe(
          map((res: any) => {
            if (res) {
              const payload = res;
              return addRendezVousSuccess({ payload });
            } else {
              return rendezVousActionFailure({
                action: 'Add new rendez-vous',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            return of(
              rendezVousActionFailure({ action: 'Add new rendez-vous', error })
            );
          })
        );
      })
    );
  });

}