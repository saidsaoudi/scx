import { createReducer, on } from "@ngrx/store";
import { Paginator } from "../../models/paginator";
import { updatePagination } from "./pagination.action";

export interface PaginationState {
    currentPage: number;
    pageSize: number;
    nextPage: number;
    totalItems: number;
}
export const initialState: PaginationState = {
    currentPage: 10,
    nextPage: 10,
    pageSize: 10,
    totalItems: 0
};

export const paginationReducer = createReducer(
    initialState,
    on(updatePagination, (state, {currentPage, nextPage, pageSize, totalItems}) => ({
      ...state,
      currentPage:  currentPage,
      nextPage: nextPage,
      pageSize: pageSize,
      totalItems: totalItems
    })),
)