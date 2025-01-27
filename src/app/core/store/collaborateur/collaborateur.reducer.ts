import { createReducer, on } from '@ngrx/store';
import { Collaborateur } from "../../models/collaborateur";
import { fetchCollaborateurs, fetchCollaborateursSuccess, fetchOneCollaborateur, fetchOneCollaborateursSuccess } from './collaborateur.action';

export interface CollaborateurState {
    payload: Collaborateur[];
    detail: {
      payload: Collaborateur,
      loading: boolean
    };
    loading: boolean;
    error: {
      action: string;
      error: any;
    } | null;
    status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: CollaborateurState = {
    payload: [],
    detail: {
      payload: new Collaborateur,
      loading: false
    },
    loading: false,
    error: null,
    status: 'INIT',
};

export const collaborateurReducer = createReducer(
    initialState,
    // RETRIEVE ALL COLLABORATEURS
    on(fetchCollaborateurs, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL COLLABORATEURS (SUCCESS)
    on(fetchCollaborateursSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE COLLABORATEURS
    on(fetchOneCollaborateur, (state) => {
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
    // RETRIEVE ONE COLLABORATEUR (SUCCESS)
    on(fetchOneCollaborateursSuccess, (state, { payload }) => ({
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