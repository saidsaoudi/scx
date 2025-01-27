import { createAction, props } from '@ngrx/store';
import { Groupe } from '../../models/groupe';

export const groupeActionFailure = createAction(
    '[groupes] Groupes Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchGroupes = createAction(
    '[groupes] Fetch List Groupes'

);
export const fetchOneGroupe = createAction(
    '[groupes] Fetch One groupe',
    props<{ uuid: string }>()

);

export const fetchGroupesSuccess = createAction(
    '[groupes] Fetch List groupes Success',
    props<{ payload: Groupe[] }>()
);
export const fetchOneGroupesSuccess = createAction(
    '[groupes] Fetch One groupes Success',
    props<{ payload: Groupe }>()
);