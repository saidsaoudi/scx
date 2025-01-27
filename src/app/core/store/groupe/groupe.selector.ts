import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { GroupeState } from './groupe.reducer';

export const appSelectGroupe = (state: AppState) => state.groupe;
export const selectGroupePayload = createSelector(
    appSelectGroupe,
  (state: GroupeState) => state.payload
);

export const selectOneGroupe = createSelector(
    appSelectGroupe,
  (state: GroupeState) => state.detail.payload
);

export const selectLoadingGroupes = createSelector(
    appSelectGroupe,
  (state: GroupeState) => state.loading
);

export const selectLoadingOneGroupe = createSelector(
    appSelectGroupe,
  (state: GroupeState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );