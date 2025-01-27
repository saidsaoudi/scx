import { createReducer, on } from '@ngrx/store';
import { Specialite } from '../../models/specialite';
import { fetchOneSpacialite, fetchOneSpecialitesSuccess, searchSpecialite, searchSpecialitesSuccess } from './specialite.action';

export interface SpecialiteState {
    payload: Specialite[];
    new : Specialite,
    detail: {
      payload: Specialite,
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

export const initialState: SpecialiteState = {
    payload: [],
    new: new Specialite,
    detail: {
      payload: new Specialite,
      loading: false
    },
    totalResults: 0,
    loading: false,
    error: null,
    status: 'INIT',
};

export const specialiteReducer = createReducer(
    initialState,
    // RETRIEVE ALL PATIENTS
    on(searchSpecialite, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL PATIENTS (SUCCESS)
    on(searchSpecialitesSuccess, (state, { payload, totalResults }) => ({
      ...state,
      totalResults: totalResults,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE PATIENT
    on(fetchOneSpacialite, (state) => {
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
    on(fetchOneSpecialitesSuccess, (state, { payload }) => ({
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