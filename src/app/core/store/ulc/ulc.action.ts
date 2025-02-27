import { createAction, props } from '@ngrx/store';
import { ULC } from '../../models/ulc';

export const ulcActionFailure = createAction(
    '[ulcs] Ulcs Action Failure',
    props<{ action: string; error: any }>()
);

export const createUlc = createAction(
    '[ulcs] Create Ulc',
    props<{ payload: ULC }>()

);

export const updateUlc = createAction(
    '[ulcs] Update Ulc',
    props<{ payload: ULC }>()

);

export const fetchUlcs = createAction(
    '[ulcs] Fetch List Ulcs',
    props<{ payload: any }>()

);
export const fetchOneUlc = createAction(
    '[ulcs] Fetch One ulc',
    props<{ uuid: string }>()

);

export const createUlcsSuccess = createAction(
    '[Ulcs] Create Ulc Success',
    props<{ payload: ULC }>()
);
export const updateUlcsSuccess = createAction(
    '[Ulcs] Update Ulc Success',
    props<{ payload: ULC }>()
);

export const fetchUlcsSuccess = createAction(
    '[ulcs] Fetch List ulcs Success',
    props<{ payload: ULC[] }>()
);
export const fetchOneUlcsSuccess = createAction(
    '[ulcs] Fetch One ulcs Success',
    props<{ payload: ULC }>()
);