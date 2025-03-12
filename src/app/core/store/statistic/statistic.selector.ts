import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { StatisticState } from './statistic.reducer';

export const appSelectStatistic = (state: AppState) => state.statistic;
export const selectStatisticPayload = createSelector(
    appSelectStatistic,
  (state: StatisticState) => state.payload
);

export const selectMinMaxStatistic = createSelector(
  appSelectStatistic,
(state: StatisticState) => state.min_max
);

export const selectLoadingCreateStatistic = createSelector(
    appSelectStatistic,
(state: StatisticState) => state.loading.create
);

export const selectLoadingUpdateStatistic = createSelector(
    appSelectStatistic,
(state: StatisticState) => state.loading.update
);

export const selectOneStatistic = createSelector(
    appSelectStatistic,
  (state: StatisticState) => state.detail.payload
);

export const selectLoadingStatistics = createSelector(
    appSelectStatistic,
  (state: StatisticState) => state.loading.list
);

export const selectLoadingMinMaxStatistics = createSelector(
  appSelectStatistic,
(state: StatisticState) => state.loading.min_max
);

export const selectLoadingOneStatistic= createSelector(
    appSelectStatistic,
  (state: StatisticState) => state.loading.detail
);

// export const selectCollaborateurByUuid = (uuid: string) => createSelector(
//   appSelectCollaborateur,
//   (state: CollaborateurState) => state.payload.find(c => c.uuid == uuid)
// );