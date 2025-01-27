import { createAction, props } from "@ngrx/store";

export const updatePagination = createAction(
    '[Pagination] Update Pagination',
    props<{ currentPage: number, nextPage: number, pageSize: number, totalItems: number }>()
);