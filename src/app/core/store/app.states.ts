import { AnalyseState } from "./analyse/analyse.reducer";
import { CityState } from "./city/city.reducer";
import { CollaborateurState } from "./collaborateur/collaborateur.reducer";
import { ConsultationState } from "./consultation/consultation.reducer";
import { DepartementState } from "./departement/departement.reducer";
import { GroupeState } from "./groupe/groupe.reducer";
import { ImagerieState } from "./imagerie/imagerie.reducer";
import { MaladieState } from "./maladie/maladie.reducer";
import { MedicamentState } from "./medicament/medicament.reducer";
import { PaginationState } from "./pagination/pagination.reducer";
import { PatientState } from "./patient/patient.reducer";
import { ProvinceState } from "./province/province.reducer";
import { RendezVousState } from "./rendez-vous/rendez-vous.reducer";
import { SpecialiteState } from "./specialite/specialite.reducer";

export interface AppState{
    patient: PatientState,
    province: ProvinceState,
    city: CityState,
    medicament: MedicamentState,
    analyse: AnalyseState,
    imagerie: ImagerieState,
    maladie: MaladieState,
    specialite: SpecialiteState,
    rendezVous: RendezVousState,
    consultation: ConsultationState,
    collaborateur: CollaborateurState
    departement: DepartementState
    groupe: GroupeState
    pagination: PaginationState
}