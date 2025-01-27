import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { RendezVousState } from './rendez-vous.reducer';

export const appSelectRendezVous = (state: AppState) => state.rendezVous;
export const selectRendezVousPayload = createSelector(
    appSelectRendezVous,
  (state: RendezVousState) => state.payload
);
export const selectRendezVousTotal = createSelector(
    appSelectRendezVous,
  (state: RendezVousState) => state.totalResults
);

export const selectOneRendezVous = createSelector(
    appSelectRendezVous,
  (state: RendezVousState) => state.detail.payload
);

export const selectNewRendezVous = createSelector(
    appSelectRendezVous,
  (state: RendezVousState) => state.new
);

export const selectLoadingRendezVous = createSelector(
    appSelectRendezVous,
  (state: RendezVousState) => state.loading
);
export const selectStatusRendezVous = createSelector(
    appSelectRendezVous,
  (state: RendezVousState) => state.status
);

export const selectLoadingOneRendezVous = createSelector(
    appSelectRendezVous,
  (state: RendezVousState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );