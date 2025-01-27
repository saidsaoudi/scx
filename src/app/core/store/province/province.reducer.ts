import { createReducer, on } from '@ngrx/store';
import { Province } from '../../models/province';
import { fetchOneProvince, fetchOneProvincesSuccess, fetchProvinces, fetchProvincesSuccess } from './province.action';

export interface ProvinceState {
    payload: Province[];
    detail: {
      payload: Province,
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

export const initialState: ProvinceState = {
    payload: [],
    detail: {
      payload: new Province,
      loading: false
    },
    totalResults: 0,
    loading: false,
    error: null,
    status: 'INIT',
};

export const provinceReducer = createReducer(
    initialState,
    // RETRIEVE ALL PROVINCES
    on(fetchProvinces, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL PROVINCES (SUCCESS)
    on(fetchProvincesSuccess, (state, { payload, totalResults }) => ({
      ...state,
      totalResults: totalResults,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE PROVINCE
    on(fetchOneProvince, (state) => {
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
    // RETRIEVE ONE PROVINCE (SUCCESS)
    on(fetchOneProvincesSuccess, (state, { payload }) => ({
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