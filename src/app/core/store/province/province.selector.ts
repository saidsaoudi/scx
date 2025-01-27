import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ProvinceState } from './province.reducer';

export const appSelectProvince = (state: AppState) => state.province;
export const selectProvincePayload = createSelector(
    appSelectProvince,
  (state: ProvinceState) => state.payload
);

export const selectProvinceTotal = createSelector(
  appSelectProvince,
(state: ProvinceState) => state.totalResults
);

export const selectOneProvince = createSelector(
    appSelectProvince,
  (state: ProvinceState) => state.detail.payload
);

export const selectLoadingProvinces = createSelector(
    appSelectProvince,
  (state: ProvinceState) => state.loading
);

export const selectLoadingOneProvince = createSelector(
    appSelectProvince,
  (state: ProvinceState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );