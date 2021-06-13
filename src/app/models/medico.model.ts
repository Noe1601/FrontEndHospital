import { Hospital } from "./hospital.model";

interface _MedicoUser{
    _id: string;
    nombre: string,
    imagen: string
}

export class Medico{
    public nombre: string;
    public _id?: string;
    public imagen?: string;
    public usuario?: _MedicoUser;
    public hospital?: Hospital;
}