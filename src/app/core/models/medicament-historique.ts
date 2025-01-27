import { Medicament } from "./medicament";

export class MedicamentHistorique {
    id!: string;
    endTime!: string;
    medication!: Medicament;
    medicationId!: string;
    note!: string;
    patientId!: string;
    route!: string;
    startTime!: string
}
