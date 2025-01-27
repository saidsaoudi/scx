import { createAction, props } from '@ngrx/store';
import { Paginator } from '../../models/paginator';
import { Analyse } from '../../models/analyse';

export const analyseActionFailure = createAction(
    '[nalyses] Analyses Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchAnalyses = createAction(
    '[analyse] Fetch List Analyses',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);
export const fetchOneAnalyse = createAction(
    '[analyses] Fetch One Analyse',
    props<{ id: string }>()

);

export const addAnalyse = createAction(
    '[analyses] Add Analyse',
    props<{ payload: any }>()
);

export const searchAnalyse = createAction(
    '[analyse] Fetch List Analyses',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);

export const addAnalyseSuccess = createAction(
    '[analyses] Add Analyse Success',
    props<{ payload: any }>()
);

export const updateAnalyse = createAction(
    '[analyse] Update Analyse',
    props<{ payload: any,  id: any  }>()
);
export const updateAnalyseSuccess = createAction(
    '[analyses] Update Analyse Success',
    props<{ payload: any, id: any }>()
);

export const fetchAnalysesSuccess = createAction(
    '[analyses] Fetch List Analyses Success',
    props<{ payload: Analyse[], totalResults: number }>()
);
export const fetchOneAnalysesSuccess = createAction(
    '[analyses] Fetch One Analyses Success',
    props<{ payload: Analyse }>()
);
export const searchAnalysesSuccess = createAction(
    '[analyses] Fetch List Analyses Success',
    props<{ payload: Analyse[], totalResults: number }>()
);

