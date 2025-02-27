import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ULCState } from './ulc.reducer';

export const appSelectUlc = (state: AppState) => state.ulc;
export const selectUlcPayload = createSelector(
    appSelectUlc,
  (state: ULCState) => state.payload
);

export const selectLoadingCreateUlc = createSelector(
    appSelectUlc,
(state: ULCState) => state.loading.create
);

export const selectLoadingUpdateUlc = createSelector(
    appSelectUlc,
(state: ULCState) => state.loading.update
);

export const selectOneUlc = createSelector(
    appSelectUlc,
  (state: ULCState) => state.detail.payload
);

export const selectLoadingUlcs = createSelector(
    appSelectUlc,
  (state: ULCState) => state.loading.list
);

export const selectLoadingOneUlc= createSelector(
    appSelectUlc,
  (state: ULCState) => state.loading.detail
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );