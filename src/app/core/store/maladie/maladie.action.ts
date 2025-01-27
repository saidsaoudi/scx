import { createAction, props } from '@ngrx/store';
import { Paginator } from '../../models/paginator';
import { Maladie } from '../../models/maladie';

export const maladieActionFailure = createAction(
    '[maladies] Maladies Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchMaladies = createAction(
    '[maladies] Fetch List Maladies',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);
export const fetchOneMaladie = createAction(
    '[Maladies] Fetch One Maladie',
    props<{ id: string }>()

);

export const addMaladie = createAction(
    '[maladies] Add Maladie',
    props<{ payload: any }>()
);

export const searchMaladies = createAction(
    '[maladies] Fetch List Maladies',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);

export const addMaladieSuccess = createAction(
    '[maladies] Add Maladie Success',
    props<{ payload: any }>()
);

export const updateMaladie = createAction(
    '[maladie] Update Maladie',
    props<{ payload: any,  id: any  }>()
);
export const updateMaladieSuccess = createAction(
    '[maladies] Update Maladie Success',
    props<{ payload: any, id: any }>()
);

export const fetchMaladiesSuccess = createAction(
    '[maladies] Fetch List Maladies Success',
    props<{ payload: Maladie[], totalResults: number }>()
);
export const fetchOneMaladiesSuccess = createAction(
    '[maladies] Fetch One Maladies Success',
    props<{ payload: Maladie }>()
);
export const searchMaladiesSuccess = createAction(
    '[maladies] Fetch List Maladies Success',
    props<{ payload: Maladie[], totalResults: number }>()
);

