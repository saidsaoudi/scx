import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { DepartementState } from './departement.reducer';

export const appSelectDepartement = (state: AppState) => state.departement;
export const selectDepartementPayload = createSelector(
    appSelectDepartement,
  (state: DepartementState) => state.payload
);

export const selectOneDepartement = createSelector(
    appSelectDepartement,
  (state: DepartementState) => state.detail.payload
);

export const selectLoadingDepartements = createSelector(
    appSelectDepartement,
  (state: DepartementState) => state.loading
);

export const selectLoadingOneDepartement = createSelector(
    appSelectDepartement,
  (state: DepartementState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );