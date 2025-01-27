import { createReducer, on } from '@ngrx/store';
import { Groupe } from '../../models/groupe';
import { fetchGroupes, fetchGroupesSuccess, fetchOneGroupe, fetchOneGroupesSuccess } from './groupe.action';

export interface GroupeState {
    payload: Groupe[];
    detail: {
      payload: Groupe,
      loading: boolean
    };
    loading: boolean;
    error: {
      action: string;
      error: any;
    } | null;
    status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: GroupeState = {
    payload: [],
    detail: {
      payload: new Groupe,
      loading: false
    },
    loading: false,
    error: null,
    status: 'INIT',
};

export const groupeReducer = createReducer(
    initialState,
    // RETRIEVE ALL GROUPES
    on(fetchGroupes, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL GROUPES (SUCCESS)
    on(fetchGroupesSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE GROUPES
    on(fetchOneGroupe, (state) => {
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
    on(fetchOneGroupesSuccess, (state, { payload }) => ({
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