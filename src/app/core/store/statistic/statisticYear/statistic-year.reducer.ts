import { createReducer, on } from '@ngrx/store';
import { StatisticYear } from 'src/app/core/models/statistic-year';
import { createStatisticYear, createStatisticYearSuccess, fetchOneStatisticYear, fetchOneStatisticYearSuccess, fetchStatisticYear, fetchStatisticYearSuccess, statisticYearActionFailure, updateStatisticYear, updateStatisticYearSuccess } from './statistic-year.action';

export interface StatisticYearState {
    payload: StatisticYear[];
    detail: {
      payload: StatisticYear,
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

export const initialState: StatisticYearState = {
    payload: [],
    detail: {
      payload: new StatisticYear,
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
      case 'Creating statistics':
          return { ...loading, create: false };
      case 'Updating statistics':
          return { ...loading, update: false };
      case 'Fetching statistics':
          return { ...loading, list: false };
      case 'Fetching one statistics':
          return { ...loading, detail: false };
      default:
          return loading;
  }
}

export const statisticYearReducer = createReducer(
    initialState,
    // RETRIEVE ALL GROUPES
    //@ts-ignore
    on(createStatisticYear, (state) => {
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
    on(createStatisticYearSuccess, (state, { payload }) => ({
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
    on(updateStatisticYear, (state) => {
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
    on(updateStatisticYearSuccess, (state, { payload }) => ({
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
    on(fetchStatisticYear, (state) => {
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
    on(fetchStatisticYearSuccess, (state, { payload }) => ({
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
    on(fetchOneStatisticYear, (state) => {
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
    on(fetchOneStatisticYearSuccess, (state, { payload }) => ({
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
    on(statisticYearActionFailure, (state, { action, error }) => ({
      ...state,
      loading: updateLoadingState(action, state.loading),
      //@ts-ignore
      status: 'SUCCESS',
      error: error,
    })),
)