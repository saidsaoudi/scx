import { collaborateurReducer } from "./collaborateur/collaborateur.reducer";
import {
    ActionReducerMap,
    MetaReducer
  } from '@ngrx/store';
import { paginationReducer } from "./pagination/pagination.reducer";
import { groupeReducer } from "./groupe/groupe.reducer";
import { departementReducer } from "./departement/departement.reducer";
import { patientReducer } from "./patient/patient.reducer";
import { provinceReducer } from "./province/province.reducer";
import { cityReducer } from "./city/city.reducer";
import { medicamentReducer } from "./medicament/medicament.reducer";
import { specialiteReducer } from "./specialite/specialite.reducer";
import { rendezVousReducer } from "./rendez-vous/rendez-vous.reducer";
import { consultationReducer } from "./consultation/consultation.reducer";
import { maladieReducer } from "./maladie/maladie.reducer";
import { analyseReducer } from "./analyse/analyse.reducer";
import { imagerieReducer } from "./imagerie/imagerie.reducer";

export interface State { }
export const reducers: ActionReducerMap<State> = {
    'patient': patientReducer,
    'province': provinceReducer,
    'city': cityReducer,
    'medicament': medicamentReducer,
    'analyse': analyseReducer,
    'imagerie': imagerieReducer,
    'maladie': maladieReducer,
    'specialite': specialiteReducer,
    'rendezVous': rendezVousReducer,
    'consultation': consultationReducer,
    'collaborateur': collaborateurReducer,
    'groupe': groupeReducer,
    'departement': departementReducer,
    'pagination': paginationReducer
}

// export const metaReducers: MetaReducer<State>[] =  [];