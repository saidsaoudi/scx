import { Docteur } from "./docteur";
import { Patient } from "./patient";

export class RendezVous {
    id!: string;
    createdAt!: string;
    doctorId!: string;
    doctor!: Docteur;
    startTime!: string;
    endTime!: string;
    patientId!: string;
    patient!: Patient;
    reason!: string;
    station!: any; // shoud be a model
    stationId!: string;
    status!: string;
    updatedAt!: string;
    userId!: string;
}
