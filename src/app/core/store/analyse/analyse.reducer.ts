import { createReducer, on } from '@ngrx/store';
import { Analyse } from '../../models/analyse';
import { fetchOneAnalyse, fetchOneAnalysesSuccess, searchAnalyse, searchAnalysesSuccess } from './analyse.action';

export interface AnalyseState {
    payload: Analyse[];
    new : Analyse,
    detail: {
      payload: Analyse,
      loading: boolean
    };
    totalResults: number;
    loading: boolean;
    error: {
      action: string;
      error: any;
    } | null;
    status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: AnalyseState = {
    payload: [],
    new: new Analyse,
    detail: {
      payload: new Analyse,
      loading: false
    },
    totalResults: 0,
    loading: false,
    error: null,
    status: 'INIT',
};

export const analyseReducer = createReducer(
    initialState,
    // RETRIEVE ALL PATIENTS
    on(searchAnalyse, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL PATIENTS (SUCCESS)
    on(searchAnalysesSuccess, (state, { payload, totalResults }) => ({
      ...state,
      totalResults: totalResults,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE PATIENT
    on(fetchOneAnalyse, (state) => {
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: true
        },
        loading: false,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ONE PATIENT (SUCCESS)
    on(fetchOneAnalysesSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      detail: {
        payload: payload,
        loading: false
      },
      status: 'SUCCESS',
      error: null,
    })),
)

const updateItemFromList = (updateItem: any, listItems: any[]) => {
  return listItems.map((item) => {
    if (item.id == updateItem.id) {
      return updateItem;
    }
    return item;
  });
};