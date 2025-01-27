import { createAction, props } from '@ngrx/store';
import { Paginator } from '../../models/paginator';
import { City } from '../../models/city';

export const cityActionFailure = createAction(
    '[cities] !cities Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchCities = createAction(
    '[cities] Fetch List Cities',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);
export const fetchOneCity = createAction(
    '[cities] Fetch One Cities',
    props<{ id: string }>()

);

export const fetchCitiesSuccess = createAction(
    '[cities] Fetch List Cities Success',
    props<{ payload: City[], totalResults: number }>()
);
export const fetchOneCitySuccess = createAction(
    '[cities] Fetch One Cities Success',
    props<{ payload: City }>()
);

