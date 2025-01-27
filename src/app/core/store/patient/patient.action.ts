import { createAction, props } from '@ngrx/store';
import { Collaborateur } from '../../models/collaborateur';
import { Paginator } from '../../models/paginator';
import { Patient } from '../../models/patient';
import { MedicamentHistorique } from '../../models/medicament-historique';
import { Consultation } from '../../models/consultation';
import { Constante } from '../../models/constante';

export const patientActionFailure = createAction(
    '[patients] Patients Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchPatients = createAction(
    '[patients] Fetch List Patients',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);
export const fetchOnePatient = createAction(
    '[patients] Fetch One Patient',
    props<{ id: string }>()

);

export const addPatient = createAction(
    '[patients] Add Patient',
    props<{ payload: any }>()
);
export const addPatientSuccess = createAction(
    '[patients] Add Patient Success',
    props<{ payload: any }>()
);

export const updatePatient = createAction(
    '[patients] Update Patient',
    props<{ payload: any,  id: any  }>()
);

export const fetchConsultations = createAction(
    '[patients] Fetch List Consultations',
    props<{ id: string }>()

);
export const fetchConsultationsSuccess = createAction(
    '[patients] Fetch One Consultations Success',
    props<{ payload: Array<Consultation>, idPatient: any }>()
);
export const fetchCurrentConsultations = createAction(
    '[patients] Fetch Current List Consultations',
    props<{ id: string }>()

);
export const fetchCurrentConsultationsSuccess = createAction(
    '[patients] Fetch Current Consultations Success',
    props<{ payload: Array<Consultation>, idPatient: any }>()
);
export const fetchMedicamentHitorique = createAction(
    '[patients] Fetch List Historiques',
    props<{ id: string }>()

);
export const fetchMedicamentHitoriqueSuccess = createAction(
    '[patients] Fetch One Historiques Success',
    props<{ payload: any, idPatient: any }>()
);
export const fetchConstantes = createAction(
    '[patients] Fetch List Constantes',
    props<{ id: string }>()

);
export const fetchConstantesSuccess = createAction(
    '[patients] Fetch One Constantes Success',
    props<{ payload: Array<Constante>, idPatient: any }>()
);
export const updatePatientSuccess = createAction(
    '[patients] Update Patient Success',
    props<{ payload: any, id: any }>()
);

export const fetchPatientsSuccess = createAction(
    '[patients] Fetch List Patients Success',
    props<{ payload: Patient[], totalResults: number }>()
);
export const fetchOnePatientsSuccess = createAction(
    '[patients] Fetch One Patients Success',
    props<{ payload: Patient }>()
);

