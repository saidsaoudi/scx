import { createAction, props } from '@ngrx/store';
import { Paginator } from '../../models/paginator';
import { Imagerie } from '../../models/imagerie';

export const imagerieActionFailure = createAction(
    '[imageries] Imageries Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchImageries = createAction(
    '[imagerie] Fetch List Imagerie',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);
export const fetchOneImagerie = createAction(
    '[amageries] Fetch One Imagerie',
    props<{ id: string }>()

);

export const addImagerie = createAction(
    '[imageries] Add Imagerie',
    props<{ payload: any }>()
);

export const searchImagerie = createAction(
    '[imageries] Fetch List Imageries',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);

export const addImagerieSuccess = createAction(
    '[imageries] Add Imagerie Success',
    props<{ payload: any }>()
);

export const updateImagerie = createAction(
    '[imageries] Update Imagerie',
    props<{ payload: any,  id: any  }>()
);
export const updateImagerieSuccess = createAction(
    '[imageries] Update Imagerie Success',
    props<{ payload: any, id: any }>()
);

export const fetchImageriesSuccess = createAction(
    '[imageries] Fetch List Imageries Success',
    props<{ payload: Imagerie[], totalResults: number }>()
);
export const fetchOneImageriesSuccess = createAction(
    '[imageries] Fetch One Imageries Success',
    props<{ payload: Imagerie }>()
);
export const searchImageriesSuccess = createAction(
    '[imageries] Fetch List Imageries Success',
    props<{ payload: Imagerie[], totalResults: number }>()
);

