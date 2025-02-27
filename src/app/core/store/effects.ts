import { StatisticsEffects } from "./statistic/statistic.effect";
import { StatisticYearEffects } from "./statistic/statisticYear/statistic-year.effects";
import { UlcsEffects } from "./ulc/ulc.effect";

export const effects = [
    UlcsEffects,
    StatisticsEffects,
    StatisticYearEffects,
]