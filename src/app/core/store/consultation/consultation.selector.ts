import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ConsultationState } from './consultation.reducer';

export const appSelectConsultation = (state: AppState) => state.consultation;
export const selectConsultationPayload = createSelector(
    appSelectConsultation,
  (state: ConsultationState) => state.payload
);
export const selectConsultationTotal = createSelector(
    appSelectConsultation,
  (state: ConsultationState) => state.totalResults
);

export const selectOneConsultation = createSelector(
    appSelectConsultation,
  (state: ConsultationState) => state.detail.payload
);

export const selectNewConsultation = createSelector(
    appSelectConsultation,
  (state: ConsultationState) => state.new
);

export const selectLoadingConsultations = createSelector(
    appSelectConsultation,
  (state: ConsultationState) => state.loading
);
export const selectStatusConsultations = createSelector(
    appSelectConsultation,
  (state: ConsultationState) => state.status
);

export const selectLoadingOneConsultation = createSelector(
    appSelectConsultation,
  (state: ConsultationState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );