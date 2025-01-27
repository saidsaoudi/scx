import { createReducer, on } from '@ngrx/store';
import { Patient } from '../../models/patient';
import { addPatient, addPatientSuccess, fetchConstantes, fetchConstantesSuccess, fetchConsultations, fetchConsultationsSuccess, fetchCurrentConsultations, fetchCurrentConsultationsSuccess, fetchMedicamentHitorique, fetchMedicamentHitoriqueSuccess, fetchOnePatient, fetchOnePatientsSuccess, fetchPatients, fetchPatientsSuccess, updatePatient, updatePatientSuccess } from './patient.action';

export interface PatientState {
    payload: Patient[];
    new : Patient,
    detail: {
      payload: Patient,
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

export const initialState: PatientState = {
    payload: [],
    new: new Patient,
    detail: {
      payload: new Patient,
      loading: false
    },
    totalResults: 0,
    loading: false,
    error: null,
    status: 'INIT',
};

export const patientReducer = createReducer(
    initialState,
    // RETRIEVE ALL PATIENTS
    on(fetchPatients, (state) => {
      return {
        ...state,
        loading: true,
        status: 'LOADING',
        error: null,
      };
    }),
    // RETRIEVE ALL PATIENTS (SUCCESS)
    on(fetchPatientsSuccess, (state, { payload, totalResults }) => ({
      ...state,
      totalResults: totalResults,
      loading: false,
      payload,
      status: 'SUCCESS',
      error: null,
    })),
    // RETRIEVE ONE PATIENT
    on(fetchOnePatient, (state) => {
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
    on(fetchOnePatientsSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      detail: {
        payload: payload,
        loading: false
      },
      status: 'SUCCESS',
      error: null,
    })),

    on(addPatient, (state) => ({
      ...state,
      loading: true,
      status: 'LOADING',
      error: null,
    })),
    on(addPatientSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      new: payload,
      payload: [payload , ...state.payload] ,
      status: 'SUCCESS',
      error: null,
    })),
    on(updatePatient, (state) => ({
      ...state,
      loading: true,
      status: 'LOADING',
      error: null,
    })),
    on(updatePatientSuccess, (state, { payload }) => ({
      ...state,
      loading: false,
      new: payload,
      // payload: updateItemFromList(payload, state.payload) ,
      status: 'SUCCESS',
      error: null,
    })),
    on(fetchMedicamentHitorique, (state) => {
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
    on(fetchMedicamentHitoriqueSuccess, (state, { payload, idPatient }) => ({
      ...state,
      loading: false,
      detail: {
        
        payload: updateMedicamentHistorique(payload, state.detail.payload, idPatient),
        loading: false
      },
      status: 'SUCCESS',
      error: null,
    })),
    on(fetchConsultations, (state) => {
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
    on(fetchConsultationsSuccess, (state, { payload, idPatient }) => ({
      ...state,
      loading: false,
      detail: {
        
        payload: updateConsultations(payload, state.detail.payload, idPatient),
        loading: false
      },
      status: 'SUCCESS',
      error: null,
    })),
    on(fetchCurrentConsultations, (state) => {
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
    on(fetchCurrentConsultationsSuccess, (state, { payload, idPatient }) => ({
      ...state,
      loading: false,
      detail: {
        
        payload: updateCurrentConsultations(payload, state.detail.payload, idPatient),
        loading: false
      },
      status: 'SUCCESS',
      error: null,
    })),
    on(fetchConstantes, (state) => {
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
    on(fetchConstantesSuccess, (state, { payload, idPatient }) => ({
      ...state,
      loading: false,
      detail: {
        
        payload: updateConstates(payload, state.detail.payload, idPatient),
        loading: false
      },
      status: 'SUCCESS',
      error: null,
    })),
)

const updateMedicamentHistorique = (historique: any, patient: Patient, idPatient: any) => {
  return { ...patient, medicationHistory: historique.medicationHistory, actualPrescription: historique.actualPrescription};
};
const updateConsultations = (consultations: any, patient: Patient, idPatient: any) => {
  return { ...patient, consultations: consultations };
};
const updateCurrentConsultations = (consultations: any, patient: Patient, idPatient: any) => {
  return { ...patient, currentConsultations: consultations };
};
const updateConstates = (constantes: any, patient: Patient, idPatient: any) => {
  return { ...patient, constantes: constantes };
};


const updateItemFromList = (updateItem: any, listItems: any[]) => {
  return listItems.map((item) => {
    if (item.id == updateItem.id) {
      return updateItem;
    }
    return item;
  });
};