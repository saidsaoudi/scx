import { createReducer, on } from '@ngrx/store';
import { Medicament } from '../../models/medicament';
import { fetchOneMedicament, fetchOneMedicamentsSuccess, searchMedicament, searchMedicamentsSuccess } from './medicament.action';

export interface MedicamentState {
    payload: Medicament[];
    new : Medicament,
    detail: {
      payload: Medicament,
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

export const initialState: MedicamentState = {
    payload: [],
    new: new Medicament,
    detail: {
      payload: new Medicament,
      loading: false
    },
    totalResults: 0,
    loading: false,
    error: null,
    status: 'INIT',
};

export const medicamentReducer = createReducer(
    initialState,
    // RETRIEVE ALL PATIENTS
    on(searchMedicament, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL PATIENTS (SUCCESS)
    on(searchMedicamentsSuccess, (state, { payload, totalResults }) => ({
      ...state,
      totalResults: totalResults,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE PATIENT
    on(fetchOneMedicament, (state) => {
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
    on(fetchOneMedicamentsSuccess, (state, { payload }) => ({
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