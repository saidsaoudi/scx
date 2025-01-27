import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { CityState } from './city.reducer';

export const appSelectCity = (state: AppState) => state.city;
export const selectCityPayload = createSelector(
    appSelectCity,
  (state: CityState) => state.payload
);

export const selectCityTotal = createSelector(
    appSelectCity,
(state: CityState) => state.totalResults
);

export const selectOneCity = createSelector(
    appSelectCity,
  (state: CityState) => state.detail.payload
);

export const selectLoadingCities = createSelector(
    appSelectCity,
  (state: CityState) => state.loading
);

export const selectLoadingOneCity = createSelector(
    appSelectCity,
  (state: CityState) => state.detail.loading
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );