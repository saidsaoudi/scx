import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CollaborateurService } from '../../services/collaborateur/collaborateur.service';
import { collaborateurActionFailure, fetchCollaborateurs, fetchCollaborateursSuccess, fetchOneCollaborateur, fetchOneCollaborateursSuccess } from './collaborateur.action';
import { of } from 'rxjs';
import { updatePagination } from '../pagination/pagination.action';

@Injectable()
export class CollaborateursEffects {
    constructor(
        private actions$: Actions,
        private collaborateurService: CollaborateurService,
        // private _toast: ToastService,
        private store: Store
      ) { }

      
  getListCollaborateurs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCollaborateurs),
      mergeMap(({paginate, paginator}) => {
        return this.collaborateurService.getAllCollaborateurs(paginate, paginator).pipe(
          map((res: any) => {
            if (res.success) {
              let payload = [];
              if(res.payload.data){
                payload = res.payload.data;
                this.store.dispatch(updatePagination({
                   currentPage: res.payload.meta.current_page,
                   pageSize: res.payload.meta.per_page,
                   nextPage: res.payload.meta.per_page,
                   totalItems: res.payload.meta.total 
                  }));
              }else{
                payload = res.payload
              }
              return fetchCollaborateursSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return collaborateurActionFailure({
                action: 'Fetching collaborateurs',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                collaborateurActionFailure({ action: 'Fetching collaborateurs', error })
            );
          })
        );
      }),

    );
  });
  getOneCollaborateur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOneCollaborateur),
      mergeMap(({uuid}) => {
        return this.collaborateurService.getOneCollaborateur(uuid).pipe(
          map((res: any) => {
            if (res.success) {
                let payload = res.payload
              return fetchOneCollaborateursSuccess({ payload });
            } else {
              console.error('Une Erreur est survenu !');
              return collaborateurActionFailure({
                action: 'Fetching collaborateurs',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.error('Une Erreur est survenu ! 1');
            return of(
                collaborateurActionFailure({ action: 'Fetching collaborateurs', error })
            );
          })
        );
      }),

    );
  });
}