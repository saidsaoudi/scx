import { createReducer, on } from '@ngrx/store';
import { ULC } from '../../models/ulc';
import { createUlc, createUlcsSuccess, fetchOneUlc, fetchOneUlcsSuccess, fetchUlcs, fetchUlcsSuccess, ulcActionFailure, updateUlc, updateUlcsSuccess } from './ulc.action';

export interface ULCState {
    payload: ULC[];
    detail: {
      payload: ULC,
    };
    loading: {
      create: boolean,
      update: boolean,
      list: boolean,
      detail: boolean,
    },
    error: {
      action: string;
      error: any;
    } | null;
    status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: ULCState = {
    payload: [],
    detail: {
      payload: new ULC,
    },
    loading: {
      create: false,
      update: false,
      list: false,
      detail: false,
    },
    error: null,
    status: 'INIT',
};

function updateLoadingState(actionType: string, loading: { create: boolean; update:boolean, list: boolean; detail: boolean }) {
  switch (actionType) {
      case 'Creating ulcs':
          return { ...loading, create: false };
      case 'Updating ulcs':
          return { ...loading, update: false };
      case 'Fetching ulcs':
          return { ...loading, list: false };
      case 'Fetching one ulcs':
          return { ...loading, detail: false };
      default:
          return loading;
  }
}

export const ulcReducer = createReducer(
    initialState,
    // RETRIEVE ALL GROUPES
    //@ts-ignore
    on(createUlc, (state) => {
      return {
        ...state,
        loading: {
          ...state.loading,
          create: true,
        },
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL GROUPES (SUCCESS)
    on(createUlcsSuccess, (state, { payload }) => ({
      ...state,
      payload: [
        ...state.payload,
        payload
      ],
      loading: {
        ...state.loading,
        create: false,
      },
      detail: {
        payload: payload,
      },
      //@ts-ignore
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ALL GROUPES
    //@ts-ignore
    on(updateUlc, (state) => {
      return {
        ...state,
        loading: {
          ...state.loading,
          update: true,
        },
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL GROUPES (SUCCESS)
    on(updateUlcsSuccess, (state, { payload }) => ({
      ...state,
      payload: [
        ...state.payload.filter(i => i.uuid != payload.uuid),
        payload
      ],
      loading: {
        ...state.loading,
        update: false,
      },
      detail: {
        payload: payload,
      },
      //@ts-ignore
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ALL GROUPES
    //@ts-ignore
    on(fetchUlcs, (state) => {
      return {
        ...state,
        loading: {
          ...state.loading,
          list: true,
        },
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL GROUPES (SUCCESS)
    on(fetchUlcsSuccess, (state, { payload }) => ({
      ...state,
      loading: {
        ...state.loading,
        list: false,
      },
      payload,
      //@ts-ignore
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE GROUPES
    //@ts-ignore
    on(fetchOneUlc, (state) => {
      return {
        ...state,
        detail: {
          ...state.detail,
        },
        loading: {
          ...state.loading,
          detail: true,
        },
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ONE GROUPES (SUCCESS)
    on(fetchOneUlcsSuccess, (state, { payload }) => ({
      ...state,
      loading: {
        ...state.loading,
        detail: false,
      },
      detail: {
        payload: payload,
      },
      //@ts-ignore
      status: 'SUCCESS',
      error: null,
    })),
    // GROUPE (ERROR)
    on(ulcActionFailure, (state, { action, error }) => ({
      ...state,
      loading: updateLoadingState(action, state.loading),
      //@ts-ignore
      status: 'SUCCESS',
      error: error,
    })),
)