import { createReducer, on } from '@ngrx/store';
import { Patient } from '../../models/patient';
import { RendezVous } from '../../models/rendez-vous';
import { addRendezVous, addRendezVousSuccess, fetchOneRendezVous, fetchOneRendezVousSuccess, fetchRendezVous, fetchRendezVousSuccess, updateRendezVous, updateRendezVousSuccess } from './rendez-vous.action';

export interface RendezVousState {
    payload: RendezVous[];
    new : RendezVous,
    detail: {
      payload: RendezVous,
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

export const initialState: RendezVousState = {
    payload: [],
    new: new RendezVous,
    detail: {
      payload: new RendezVous,
      loading: false
    },
    totalResults: 0,
    loading: false,
    error: null,
    status: 'INIT',
};

export const rendezVousReducer = createReducer(
    initialState,
    // RETRIEVE ALL PATIENTS
    on(fetchRendezVous, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL PATIENTS (SUCCESS)
    on(fetchRendezVousSuccess, (state, { payload, totalResults }) => ({
      ...state,
      totalResults: totalResults,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE PATIENT
    on(fetchOneRendezVous, (state) => {
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
    on(fetchOneRendezVousSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      detail: {
        payload: payload,
        loading: false
      },
      status: 'SUCCESS',
      error: null,
    })),

    on(addRendezVous, (state) => ({
      ...state,
      loading: true,
      status: 'LOADING',
      error: null,
    })),
    on(addRendezVousSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      new: payload,
      payload: [payload , ...state.payload] ,
      status: 'SUCCESS',
      error: null,
    })),
    on(updateRendezVous, (state) => ({
      ...state,
      loading: true,
      status: 'LOADING',
      error: null,
    })),
    on(updateRendezVousSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      new: payload,
      // payload: updateItemFromList(payload, state.payload) ,
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