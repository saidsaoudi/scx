import { createAction, props } from '@ngrx/store';
import { Departement } from '../../models/departement';

export const departementActionFailure = createAction(
    '[departements] Departements Action Failure',
    props<{ action: string; error: any }>()
);

export const fetchDepartements = createAction(
    '[departements] Fetch List Departements'

);
export const fetchOneDepartement = createAction(
    '[departements] Fetch One departement',
    props<{ uuid: string }>()

);

export const fetchDepartementsSuccess = createAction(
    '[departements] Fetch List departements Success',
    props<{ payload: Departement[] }>()
);
export const fetchOneDepartementsSuccess = createAction(
    '[departements] Fetch One departements Success',
    props<{ payload: Departement }>()
);