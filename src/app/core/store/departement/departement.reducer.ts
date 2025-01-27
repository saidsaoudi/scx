import { createReducer, on } from '@ngrx/store';
import { Departement } from '../../models/departement';
import { fetchDepartements, fetchDepartementsSuccess, fetchOneDepartement, fetchOneDepartementsSuccess } from './departement.action';

export interface DepartementState {
    payload: Departement[];
    detail: {
      payload: Departement,
      loading: boolean
    };
    loading: boolean;
    error: {
      action: string;
      error: any;
    } | null;
    status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: DepartementState = {
    payload: [],
    detail: {
      payload: new Departement,
      loading: false
    },
    loading: false,
    error: null,
    status: 'INIT',
};

export const departementReducer = createReducer(
    initialState,
    // RETRIEVE ALL GROUPES
    on(fetchDepartements, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL GROUPES (SUCCESS)
    on(fetchDepartementsSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE GROUPES
    on(fetchOneDepartement, (state) => {
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
    // RETRIEVE ONE GROUPES (SUCCESS)
    on(fetchOneDepartementsSuccess, (state, { payload }) => ({
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