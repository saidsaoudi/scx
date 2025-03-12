import { createAction, props } from '@ngrx/store';
import { Statistic } from '../../models/statistic';

export const statisticActionFailure = createAction(
    '[statistics] Statistics Action Failure',
    props<{ action: string; error: any }>()
);

export const createStatistic = createAction(
    '[statistics] Create Statistic',
    props<{ payload: Statistic }>()

);

export const updateStatistic = createAction(
    '[statistics] Update Statistic',
    props<{ payload: Statistic }>()

);

export const fetchStatistics = createAction(
    '[statistics] Fetch List Statistics',
    props<{ payload: any }>()

);
export const fetchOneStatistic = createAction(
    '[statistics] Fetch One statistic',
    props<{ uuid: string }>()

);

export const fetchMinMaxStatistics = createAction(
    '[statistics] Fetch Min Max Statistics',
    props<{ payload: any }>()

);

export const createStatisticsSuccess = createAction(
    '[Statistics] Create Statistic Success',
    props<{ payload: Statistic }>()
);
export const updateStatisticsSuccess = createAction(
    '[Statistics] Update Statistic Success',
    props<{ payload: Statistic }>()
);

export const fetchStatisticsSuccess = createAction(
    '[statistics] Fetch List statistics Success',
    props<{ payload: Statistic[] }>()
);
export const fetchOneStatisticsSuccess = createAction(
    '[statistics] Fetch One statistics Success',
    props<{ payload: Statistic }>()
);
export const fetchMinMaxtatisticsSuccess = createAction(
    '[statistics] Fetch Min Max statistics Success',
    props<{ payload: Statistic[] }>()
);