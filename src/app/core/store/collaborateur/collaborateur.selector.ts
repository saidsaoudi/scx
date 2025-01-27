import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { CollaborateurState } from './collaborateur.reducer';

export const appSelectCollaborateur = (state: AppState) => state.collaborateur;
export const selectCollaborateurPayload = createSelector(
    appSelectCollaborateur,
  (state: CollaborateurState) => state.payload
);

export const selectOneCollaborateur = createSelector(
    appSelectCollaborateur,
  (state: CollaborateurState) => state.detail.payload
);

export const selectLoadingCollaborateurs = createSelector(
    appSelectCollaborateur,
  (state: CollaborateurState) => state.loading
);

export const selectLoadingOneCollaborateur = createSelector(
    appSelectCollaborateur,
  (state: CollaborateurState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );