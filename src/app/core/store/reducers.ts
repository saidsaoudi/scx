import {
    ActionReducerMap,
    MetaReducer
  } from '@ngrx/store';
import { paginationReducer } from "./pagination/pagination.reducer";

export interface State { }
export const reducers: ActionReducerMap<State> = {
    'pagination': paginationReducer
}

// export const metaReducers: MetaReducer<State>[] =  [];