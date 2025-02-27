import { createSelector } from '@ngrx/store';
import { StatisticYearState } from './statistic-year.reducer';
import { AppState } from '../../app.states';

export const appSelectStatisticYear = (state: AppState) => state.statisticYear;
export const selectStatisticYearPayload = createSelector(
    appSelectStatisticYear,
  (state: StatisticYearState) => state.payload
);

export const selectLoadingCreateStatisticYear = createSelector(
    appSelectStatisticYear,
(state: StatisticYearState) => state.loading.create
);

export const selectLoadingUpdateStatisticYear = createSelector(
    appSelectStatisticYear,
(state: StatisticYearState) => state.loading.update
);

export const selectOneStatisticYear = createSelector(
    appSelectStatisticYear,
  (state: StatisticYearState) => state.detail.payload
);

export const selectLoadingStatisticYear = createSelector(
    appSelectStatisticYear,
  (state: StatisticYearState) => state.loading.list
);

export const selectLoadingOneStatisticYear= createSelector(
    appSelectStatisticYear,
  (state: StatisticYearState) => state.loading.detail
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );