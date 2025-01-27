import { createAction, props } from '@ngrx/store';
import { Collaborateur } from '../../models/collaborateur';
import { Paginator } from '../../models/paginator';

export const collaborateurActionFailure = createAction(
    '[collaborateurs] Collaborateurs Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchCollaborateurs = createAction(
    '[collaborateurs] Fetch List Collaborateurs',
    props<{ paginate: Boolean, paginator: Paginator | undefined }>()

);
export const fetchOneCollaborateur = createAction(
    '[collaborateurs] Fetch One Collaborateur',
    props<{ uuid: string }>()

);

export const fetchCollaborateursSuccess = createAction(
    '[collaborateurs] Fetch List Collaborateurs Success',
    props<{ payload: Collaborateur[] }>()
);
export const fetchOneCollaborateursSuccess = createAction(
    '[collaborateurs] Fetch One Collaborateurs Success',
    props<{ payload: Collaborateur }>()
);

