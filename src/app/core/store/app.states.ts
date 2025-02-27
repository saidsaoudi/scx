import { PaginationState } from "./pagination/pagination.reducer"
import { StatisticState } from "./statistic/statistic.reducer"
import { StatisticYearState } from "./statistic/statisticYear/statistic-year.reducer"
import { ULCState } from "./ulc/ulc.reducer"

export interface AppState{
    ulc: ULCState
    statistic: StatisticState
    statisticYear: StatisticYearState
    pagination: PaginationState
}