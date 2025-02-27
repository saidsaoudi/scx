import { createAction, props } from '@ngrx/store';
import { StatisticYear } from 'src/app/core/models/statistic-year';

export const statisticYearActionFailure = createAction(
    '[statisticYear] StatisticYear Action Failure',
    props<{ action: string; error: any }>()
);

export const createStatisticYear = createAction(
    '[statisticYear] Create StatisticYear',
    props<{ payload: StatisticYear }>()

);

export const updateStatisticYear = createAction(
    '[statisticYear] Update StatisticYear',
    props<{ payload: StatisticYear }>()

);

export const fetchStatisticYear = createAction(
    '[StatisticYear] Fetch List StatisticYear',
    props<{ payload: any }>()

);
export const fetchOneStatisticYear = createAction(
    '[StatisticYear] Fetch One StatisticYear',
    props<{ uuid: string }>()

);

export const createStatisticYearSuccess = createAction(
    '[StatisticYear] Create StatisticYear Success',
    props<{ payload: StatisticYear }>()
);
export const updateStatisticYearSuccess = createAction(
    '[StatisticYear] Update StatisticYear Success',
    props<{ payload: StatisticYear }>()
);

export const fetchStatisticYearSuccess = createAction(
    '[StatisticYear] Fetch List StatisticYear Success',
    props<{ payload: StatisticYear[] }>()
);
export const fetchOneStatisticYearSuccess = createAction(
    '[StatisticYear] Fetch One StatisticYear Success',
    props<{ payload: StatisticYear }>()
);