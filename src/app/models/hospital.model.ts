interface _hospitalUser{
    id: string;
    nombre: string;
    imagen: string;
}

export class Hospital {

    constructor(
        public nombre: string,
        public _id?: string,
        public usuario?: _hospitalUser,
        public imagen?: string
    ){}

}