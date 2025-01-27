import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { AnalyseState } from './analyse.reducer';

export const appSelectAnalyse = (state: AppState) => state.analyse;
export const selectAnalysePayload = createSelector(
    appSelectAnalyse,
  (state: AnalyseState) => state.payload
);
export const selectAnalyseTotal = createSelector(
    appSelectAnalyse,
  (state: AnalyseState) => state.totalResults
);

export const selectOneAnalyse = createSelector(
    appSelectAnalyse,
  (state: AnalyseState) => state.detail.payload
);

export const selectNewAnalyse = createSelector(
    appSelectAnalyse,
  (state: AnalyseState) => state.new
);

export const selectLoadingAnalyses = createSelector(
    appSelectAnalyse,
  (state: AnalyseState) => state.loading
);
export const selectStatusAnalyses = createSelector(
    appSelectAnalyse,
  (state: AnalyseState) => state.status
);

export const selectLoadingOneAnalyse = createSelector(
    appSelectAnalyse,
  (state: AnalyseState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );