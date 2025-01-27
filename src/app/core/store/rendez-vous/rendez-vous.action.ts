import { createAction, props } from '@ngrx/store';
import { Paginator } from '../../models/paginator';
import { RendezVous } from '../../models/rendez-vous';

export const rendezVousActionFailure = createAction(
    '[rendez-vous] Rendez-vous Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchRendezVous = createAction(
    '[rendez-vous] Fetch List Rendez-vous',
    props<{ paginate: Boolean, paginator: Paginator | undefined }>()

);
export const fetchOneRendezVous = createAction(
    '[rendez-vous] Fetch One Rendez-vous',
    props<{ id: string }>()

);

export const addRendezVous = createAction(
    '[rendez-vous] Add Rendez-vous',
    props<{ payload: any }>()
);

export const searchRendezVous = createAction(
    '[rendez-vous] Fetch List Rendez-vous',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);

export const addRendezVousSuccess = createAction(
    '[rendez-vous] Add Rendez-vous Success',
    props<{ payload: any }>()
);

export const updateRendezVous = createAction(
    '[rendez-vous] Update Rendez-vous',
    props<{ payload: any,  id: any  }>()
);
export const updateRendezVousSuccess = createAction(
    '[rendez-vous] Update Rendez-vous Success',
    props<{ payload: any, id: any }>()
);

export const fetchRendezVousSuccess = createAction(
    '[rendez-vous] Fetch List Rendez-vous Success',
    props<{ payload: RendezVous[], totalResults: number }>()
);
export const fetchOneRendezVousSuccess = createAction(
    '[rendez-vous] Fetch One Rendez-vous Success',
    props<{ payload: RendezVous }>()
);
export const searchRendezVousSuccess = createAction(
    '[rendez-vous] Fetch List Rendez-vous Success',
    props<{ payload: RendezVous[], totalResults: number }>()
);

