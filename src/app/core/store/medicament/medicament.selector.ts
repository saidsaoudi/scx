import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { MedicamentState } from './medicament.reducer';

export const appSelectMedicament = (state: AppState) => state.medicament;
export const selectMedicamentPayload = createSelector(
    appSelectMedicament,
  (state: MedicamentState) => state.payload
);
export const selectMedicamentTotal = createSelector(
    appSelectMedicament,
  (state: MedicamentState) => state.totalResults
);

export const selectOneMedicament = createSelector(
    appSelectMedicament,
  (state: MedicamentState) => state.detail.payload
);

export const selectNewMedicament = createSelector(
    appSelectMedicament,
  (state: MedicamentState) => state.new
);

export const selectLoadingMedicaments = createSelector(
    appSelectMedicament,
  (state: MedicamentState) => state.loading
);
export const selectStatusMedicaments = createSelector(
    appSelectMedicament,
  (state: MedicamentState) => state.status
);

export const selectLoadingOneMedicament = createSelector(
    appSelectMedicament,
  (state: MedicamentState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );