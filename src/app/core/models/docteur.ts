import { Specialite } from "./specialite";
import { User } from "./user";

export class Docteur {
    id!: string;
    createdAt!: string;
    inpe!: string;
    planning!: string;
    regionId!: string;
    speciality!: Specialite // need to be a model;
    specialityId!: string;
    updatedAt!: string;
    user!: User;
    userId!: string;
}
