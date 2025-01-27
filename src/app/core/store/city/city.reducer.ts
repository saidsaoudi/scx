import { createReducer, on } from '@ngrx/store';
import { City } from '../../models/city';
import { fetchCities, fetchCitiesSuccess, fetchOneCity, fetchOneCitySuccess } from './city.action';

export interface CityState {
    payload: City[];
    detail: {
      payload: City,
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

export const initialState: CityState = {
    payload: [],
    detail: {
      payload: new City,
      loading: false
    },
    totalResults: 0,
    loading: false,
    error: null,
    status: 'INIT',
};

export const cityReducer = createReducer(
    initialState,
    // RETRIEVE ALL PROVINCES
    on(fetchCities, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL PROVINCES (SUCCESS)
    on(fetchCitiesSuccess, (state, { payload, totalResults }) => ({
      ...state,
      totalResults: totalResults,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE PROVINCE
    on(fetchOneCity, (state) => {
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
    on(fetchOneCitySuccess, (state, { payload }) => ({
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