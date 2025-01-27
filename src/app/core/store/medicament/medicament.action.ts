import { createAction, props } from '@ngrx/store';
import { Paginator } from '../../models/paginator';
import { Medicament } from '../../models/medicament';

export const medicamentActionFailure = createAction(
    '[medicaments] Medicaments Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchMedicaments = createAction(
    '[medicament] Fetch List Medicaments',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);
export const fetchOneMedicament = createAction(
    '[medicaments] Fetch One Medicament',
    props<{ id: string }>()

);

export const addMedicament = createAction(
    '[medicaments] Add Medicament',
    props<{ payload: any }>()
);

export const searchMedicament = createAction(
    '[medicament] Fetch List Medicaments',
    props<{ paginate: Boolean, paginator: Paginator | undefined, search: any }>()

);

export const addMedicamentSuccess = createAction(
    '[medicaments] Add Medicament Success',
    props<{ payload: any }>()
);

export const updateMedicament = createAction(
    '[medicament] Update Medicament',
    props<{ payload: any,  id: any  }>()
);
export const updateMedicamentSuccess = createAction(
    '[medicaments] Update Medicament Success',
    props<{ payload: any, id: any }>()
);

export const fetchMedicamentsSuccess = createAction(
    '[medicaments] Fetch List Medicaments Success',
    props<{ payload: Medicament[], totalResults: number }>()
);
export const fetchOneMedicamentsSuccess = createAction(
    '[medicaments] Fetch One Medicaments Success',
    props<{ payload: Medicament }>()
);
export const searchMedicamentsSuccess = createAction(
    '[medicaments] Fetch List Medicaments Success',
    props<{ payload: Medicament[], totalResults: number }>()
);

