import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { PatientState } from './patient.reducer';

export const appSelectPatient = (state: AppState) => state.patient;
export const selectPatientPayload = createSelector(
    appSelectPatient,
  (state: PatientState) => state.payload
);
export const selectPatientTotal = createSelector(
    appSelectPatient,
  (state: PatientState) => state.totalResults
);

export const selectOnePatient = createSelector(
    appSelectPatient,
  (state: PatientState) => state.detail.payload
);

export const selectNewPatient = createSelector(
    appSelectPatient,
  (state: PatientState) => state.new
);

export const selectLoadingPatients = createSelector(
    appSelectPatient,
  (state: PatientState) => state.loading
);
export const selectStatusPatients = createSelector(
    appSelectPatient,
  (state: PatientState) => state.status
);

export const selectLoadingOnePatient = createSelector(
    appSelectPatient,
  (state: PatientState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );