import { AnalysesEffects } from "./analyse/analyse.effect";
import { CitiesEffects } from "./city/city.effect";
import { CollaborateursEffects } from "./collaborateur/collaborateur.effect";
import { ConsultationsEffects } from "./consultation/consultation.effect";
import { DepartementsEffects } from "./departement/departement.effect";
import { GroupesEffects } from "./groupe/groupe.effect";
import { ImageriesEffects } from "./imagerie/imagerie.effect";
import { MaladiesEffects } from "./maladie/maladie.effect";
import { MedicamentsEffects } from "./medicament/medicament.effect";
import { PatientsEffects } from "./patient/patient.effetc";
import { ProvincesEffects } from "./province/province.effect";
import { RendezVousEffect } from "./rendez-vous/rendez-vous.effect";
import { SpecialitesEffects } from "./specialite/specialite.effect";

export const effects = [
    MedicamentsEffects,
    AnalysesEffects,
    ImageriesEffects,
    MaladiesEffects,
    SpecialitesEffects,
    RendezVousEffect,
    ConsultationsEffects,
    CitiesEffects,
    ProvincesEffects,
    PatientsEffects,
    CollaborateursEffects,
    GroupesEffects,
    DepartementsEffects
]