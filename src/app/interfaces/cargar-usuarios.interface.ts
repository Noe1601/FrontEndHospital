import { Usuario } from "../models/usuarios.model";



export interface CargarUsuario {
    totalUsuarios: number,
    usuarios: Usuario[];
}