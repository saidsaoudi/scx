import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { GroupeService } from '../../services/groupe/groupe.service';
import { fetchGroupes, fetchGroupesSuccess, fetchOneGroupe, fetchOneGroupesSuccess, groupeActionFailure } from './groupe.action';

@Injectable()
export class GroupesEffects {
    constructor(
        private actions$: Actions,
        private groupeService: GroupeService,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  getListGroupes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchGroupes),
      mergeMap(({}) => {
        return this.groupeService.getAllGroupes().pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchGroupesSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return groupeActionFailure({
                action: 'Fetching groupes',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                groupeActionFailure({ action: 'Fetching groupes', error })
            );
          })
        );
      }),

    );
  });
  getOneGroupe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOneGroupe),
      mergeMap(({uuid}) => {
        return this.groupeService.getOneGroupe(uuid).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchOneGroupesSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return groupeActionFailure({
                action: 'Fetching groupes',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                groupeActionFailure({ action: 'Fetching groupes', error })
            );
          })
        );
      }),

    );
  });
}