import { createAction, props } from '@ngrx/store';
import { Paginator } from '../../models/paginator';;
import { Specialite } from '../../models/specialite';

export const specialiteActionFailure = createAction(
    '[specialites] Specialites Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchSpecialites = createAction(
    '[specialite] Fetch List Specialites',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);
export const fetchOneSpacialite = createAction(
    '[specialites] Fetch One Specialite',
    props<{ id: string }>()

);

export const addSpecialite = createAction(
    '[specialites] Add Specialite',
    props<{ payload: any }>()
);

export const searchSpecialite = createAction(
    '[specialite] Fetch List Specialites',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);

export const addSpecialiteSuccess = createAction(
    '[specialites] Add Specialite Success',
    props<{ payload: any }>()
);

export const updateSpecialite = createAction(
    '[specialite] Update Specialite',
    props<{ payload: any,  id: any  }>()
);
export const updateSpecialiteSuccess = createAction(
    '[specialites] Update Specialite Success',
    props<{ payload: any, id: any }>()
);

export const fetchSpecialitesSuccess = createAction(
    '[specialites] Fetch List Specialites Success',
    props<{ payload: Specialite[], totalResults: number }>()
);
export const fetchOneSpecialitesSuccess = createAction(
    '[specialites] Fetch One Specialites Success',
    props<{ payload: Specialite }>()
);
export const searchSpecialitesSuccess = createAction(
    '[specialites] Fetch List Specialites Success',
    props<{ payload: Specialite[], totalResults: number }>()
);

