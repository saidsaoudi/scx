import { createReducer, on } from '@ngrx/store';
import { Imagerie } from '../../models/imagerie';
import { fetchOneImagerie, fetchOneImageriesSuccess, searchImagerie, searchImageriesSuccess } from './imagerie.action';

export interface ImagerieState {
    payload: Imagerie[];
    new : Imagerie,
    detail: {
      payload: Imagerie,
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

export const initialState: ImagerieState = {
    payload: [],
    new: new Imagerie,
    detail: {
      payload: new Imagerie,
      loading: false
    },
    totalResults: 0,
    loading: false,
    error: null,
    status: 'INIT',
};

export const imagerieReducer = createReducer(
    initialState,
    // RETRIEVE ALL PATIENTS
    on(searchImagerie, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL PATIENTS (SUCCESS)
    on(searchImageriesSuccess, (state, { payload, totalResults }) => ({
      ...state,
      totalResults: totalResults,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE PATIENT
    on(fetchOneImagerie, (state) => {
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
    on(fetchOneImageriesSuccess, (state, { payload }) => ({
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