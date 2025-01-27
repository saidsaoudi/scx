
import { City } from "./city";
import { Constante } from "./constante";
import { Consultation } from "./consultation";
import { MedicalHistorique } from "./medical-historique";
import { MedicamentHistorique } from "./medicament-historique";
import { User } from "./user";

export class Patient {
    affiliationNumber!: string;
    centerId!: string;
    cine!: string;
    cityId!: string;
    createdAt!: string;
    createdById!: string;
    id!: string;
    ipp!: string;
    medicalCover!: string;
    medicalHistoryId!: string;
    memberId!: string;
    nationality!: string;
    type!: string;
    updatedAt!: string;
    userId!: string;
    nom!: string;
    prenom!: string;
    user!: User
    city!: City;
    medicalHistory!: MedicalHistorique;
    consultations: Array<Consultation> = [];
    currentConsultations: Array<Consultation> = [];
    vitalSigns!: Array<Constante>;
    medicationHistory!: Array<MedicamentHistorique>
    actualPrescription!: Array<MedicamentHistorique>
}
