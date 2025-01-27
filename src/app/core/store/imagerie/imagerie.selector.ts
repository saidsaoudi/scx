import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ImagerieState } from './imagerie.reducer';

export const appSelectImagerie = (state: AppState) => state.imagerie;
export const selectImageriePayload = createSelector(
    appSelectImagerie,
  (state: ImagerieState) => state.payload
);
export const selectImagerieTotal = createSelector(
    appSelectImagerie,
  (state: ImagerieState) => state.totalResults
);

export const selectOneImagerie = createSelector(
    appSelectImagerie,
  (state: ImagerieState) => state.detail.payload
);

export const selectNewImagerie = createSelector(
    appSelectImagerie,
  (state: ImagerieState) => state.new
);

export const selectLoadingImageries = createSelector(
    appSelectImagerie,
  (state: ImagerieState) => state.loading
);
export const selectStatusImageries = createSelector(
    appSelectImagerie,
  (state: ImagerieState) => state.status
);

export const selectLoadingOneImagerie = createSelector(
    appSelectImagerie,
  (state: ImagerieState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );