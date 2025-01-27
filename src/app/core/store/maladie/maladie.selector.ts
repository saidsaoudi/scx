import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { MaladieState } from './maladie.reducer';

export const appSelectMaladie = (state: AppState) => state.maladie;
export const selectMaladiePayload = createSelector(
    appSelectMaladie,
  (state: MaladieState) => state.payload
);
export const selectMaladieTotal = createSelector(
    appSelectMaladie,
  (state: MaladieState) => state.totalResults
);

export const selectOneMaladie = createSelector(
    appSelectMaladie,
  (state: MaladieState) => state.detail.payload
);

export const selectNewMaladie = createSelector(
    appSelectMaladie,
  (state: MaladieState) => state.new
);

export const selectLoadingMaladies = createSelector(
    appSelectMaladie,
  (state: MaladieState) => state.loading
);
export const selectStatusMaladies = createSelector(
    appSelectMaladie,
  (state: MaladieState) => state.status
);

export const selectLoadingOneMedicament = createSelector(
    appSelectMaladie,
  (state: MaladieState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );