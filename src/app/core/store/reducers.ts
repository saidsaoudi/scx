import {
    ActionReducerMap,
    MetaReducer
  } from '@ngrx/store';
import { paginationReducer } from "./pagination/pagination.reducer";
import { ulcReducer } from './ulc/ulc.reducer';
import { statisticReducer } from './statistic/statistic.reducer';
import { statisticYearReducer } from './statistic/statisticYear/statistic-year.reducer';

export interface State { }
export const reducers: ActionReducerMap<State> = {
    'ulc': ulcReducer,
    'statistic': statisticReducer,
    'statisticYear': statisticYearReducer,
    'pagination': paginationReducer
}

// export const metaReducers: MetaReducer<State>[] =  [];