import { createAction, props } from '@ngrx/store';
import { Paginator } from '../../models/paginator';
import { Province } from '../../models/province';

export const provinceActionFailure = createAction(
    '[provinces] Provinces Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchProvinces = createAction(
    '[provinces] Fetch List Provinces',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);
export const fetchOneProvince = createAction(
    '[provinces] Fetch One Provinces',
    props<{ id: string }>()

);

export const fetchProvincesSuccess = createAction(
    '[provinces] Fetch List Provinces Success',
    props<{ payload: Province[], totalResults: number }>()
);
export const fetchOneProvincesSuccess = createAction(
    '[provinces] Fetch One Provinces Success',
    props<{ payload: Province }>()
);

