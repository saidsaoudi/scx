import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { SpecialiteState } from './specialite.reducer';

export const appSelectSpecialite = (state: AppState) => state.specialite;
export const selectSpecialitePayload = createSelector(
    appSelectSpecialite,
  (state: SpecialiteState) => state.payload
);
export const selectMedicamentTotal = createSelector(
    appSelectSpecialite,
  (state: SpecialiteState) => state.totalResults
);

export const selectOneMedicament = createSelector(
    appSelectSpecialite,
  (state: SpecialiteState) => state.detail.payload
);

export const selectNewMedicament = createSelector(
    appSelectSpecialite,
  (state: SpecialiteState) => state.new
);

export const selectLoadingMedicaments = createSelector(
    appSelectSpecialite,
  (state: SpecialiteState) => state.loading
);
export const selectStatusMedicaments = createSelector(
    appSelectSpecialite,
  (state: SpecialiteState) => state.status
);

export const selectLoadingOneMedicament = createSelector(
    appSelectSpecialite,
  (state: SpecialiteState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );