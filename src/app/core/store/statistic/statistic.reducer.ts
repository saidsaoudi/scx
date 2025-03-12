import { createReducer, on } from '@ngrx/store';
import { Statistic } from '../../models/statistic';
import { createStatistic, createStatisticsSuccess, fetchMinMaxStatistics, fetchMinMaxtatisticsSuccess, fetchOneStatistic, fetchOneStatisticsSuccess, fetchStatistics, fetchStatisticsSuccess, statisticActionFailure, updateStatistic, updateStatisticsSuccess } from './statistic.action';

export interface StatisticState {
    payload: Statistic[];
    detail: {
      payload: Statistic,
    };
    min_max: any,
    loading: {
      create: boolean,
      update: boolean,
      list: boolean,
      min_max: boolean,
      detail: boolean,
    },
    error: {
      action: string;
      error: any;
    } | null;
    status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: StatisticState = {
    payload: [],
    detail: {
      payload: new Statistic,
    },
    min_max: null,
    loading: {
      create: false,
      update: false,
      list: false,
      min_max: false,
      detail: false,
    },
    error: null,
    status: 'INIT',
};

function updateLoadingState(actionType: string, loading: { create: boolean; update:boolean, list: boolean; min_max: boolean, detail: boolean }) {
  switch (actionType) {
      case 'Creating statistics':
          return { ...loading, create: false };
      case 'Updating statistics':
          return { ...loading, update: false };
      case 'Fetching statistics':
          return { ...loading, list: false };
      case 'Fetching Min Max statistics':
        return { ...loading, min_max: false };
      case 'Fetching one statistics':
          return { ...loading, detail: false };
      default:
          return loading;
  }
}

export const statisticReducer = createReducer(
    initialState,
    // RETRIEVE ALL GROUPES
    //@ts-ignore
    on(createStatistic, (state) => {
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
    on(createStatisticsSuccess, (state, { payload }) => ({
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
    on(updateStatistic, (state) => {
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
    on(updateStatisticsSuccess, (state, { payload }) => ({
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
    on(fetchStatistics, (state) => {
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
    on(fetchStatisticsSuccess, (state, { payload }) => ({
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
    on(fetchOneStatistic, (state) => {
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
    on(fetchOneStatisticsSuccess, (state, { payload }) => ({
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
    // RETRIEVE ALL GROUPES
    //@ts-ignore
    on(fetchMinMaxStatistics, (state) => {
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
    on(fetchMinMaxtatisticsSuccess, (state, { payload }) => ({
      ...state,
      loading: {
        ...state.loading,
        list: false,
      },
      min_max: payload,
      //@ts-ignore
      status: 'SUCCESS',
      error: null,
    })),
    // GROUPE (ERROR)
    on(statisticActionFailure, (state, { action, error }) => ({
      ...state,
      loading: updateLoadingState(action, state.loading),
      //@ts-ignore
      status: 'SUCCESS',
      error: error,
    })),
)