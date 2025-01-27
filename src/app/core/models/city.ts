import { Province } from "./province";

export class City {
    createdAt!: string;
    id!: string;
    name!: string;
    province!: Province;
    provinceId!: string;
    updatedAt!: string;
}
