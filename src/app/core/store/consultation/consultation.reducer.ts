import { createReducer, on } from '@ngrx/store';
import { Patient } from '../../models/patient';
import { Consultation } from '../../models/consultation';
import { addConsultation, addConsultationSuccess, fetchConsultations, fetchConsultationsSuccess, fetchOneConsultation, fetchOneConsultationsSuccess, updateConsultation, updateConsultationSuccess } from './consultation.action';

export interface ConsultationState {
    payload: Consultation[];
    new : Consultation,
    detail: {
      payload: Consultation,
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

export const initialState: ConsultationState = {
    payload: [],
    new: new Consultation,
    detail: {
      payload: new Consultation,
      loading: false
    },
    totalResults: 0,
    loading: false,
    error: null,
    status: 'INIT',
};

export const consultationReducer = createReducer(
    initialState,
    // RETRIEVE ALL PATIENTS
    on(fetchConsultations, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL PATIENTS (SUCCESS)
    on(fetchConsultationsSuccess, (state, { payload, totalResults }) => ({
      ...state,
      totalResults: totalResults,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE PATIENT
    on(fetchOneConsultation, (state) => {
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: true
        },
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ONE PATIENT (SUCCESS)
    on(fetchOneConsultationsSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      detail: {
        payload: payload,
        loading: false
      },
      status: 'SUCCESS',
      error: null,
    })),

    on(addConsultation, (state) => ({
      ...state,
      loading: true,
      status: 'LOADING',
      error: null,
    })),
    on(addConsultationSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      new: payload,
      payload: [payload , ...state.payload] ,
      status: 'SUCCESS',
      error: null,
    })),
    on(updateConsultation, (state) => ({
      ...state,
      loading: true,
      status: 'LOADING',
      error: null,
    })),
    on(updateConsultationSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      new: payload,
      payload: updateItemFromList(payload, state.payload) ,
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