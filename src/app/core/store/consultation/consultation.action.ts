import { createAction, props } from '@ngrx/store';
import { Paginator } from '../../models/paginator';
import { Consultation } from '../../models/consultation';

export const consultationActionFailure = createAction(
    '[consultations] Consultations Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchConsultations = createAction(
    '[consultations] Fetch List Consultations',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);
export const fetchOneConsultation = createAction(
    '[consultation] Fetch One Consultation',
    props<{ id: string }>()

);

export const addConsultation = createAction(
    '[consultations] Add Consultation',
    props<{ payload: any }>()
);
export const addConsultationSuccess = createAction(
    '[consultations] Add Consultation Success',
    props<{ payload: any }>()
);

export const updateConsultation = createAction(
    '[consultations] Update Consultation',
    props<{ payload: any,  id: any  }>()
);
export const updateConsultationSuccess = createAction(
    '[consultations] Update Consultation Success',
    props<{ payload: any, id: any }>()
);

export const fetchConsultationsSuccess = createAction(
    '[consultations] Fetch List Consultations Success',
    props<{ payload: Consultation[], totalResults: number }>()
);
export const fetchOneConsultationsSuccess = createAction(
    '[consultations] Fetch One Consultations Success',
    props<{ payload: Consultation }>()
);

