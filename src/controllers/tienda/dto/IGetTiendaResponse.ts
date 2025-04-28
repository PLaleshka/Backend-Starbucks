// src/controllers/tienda/dto/IGetTiendaResponse.ts

export interface IAdministradorTiendaResponse {
    idAdministrador: number;
    nombre: string;
    apellido: string;
    correoElectronico: string;
}

export interface IGetTiendaResponse {
    idTienda: number;
    nombreTienda: string;
    horario: string;
    ubicacion: string;
    capacidad: number;
    disponibilidad: string;
    correoElectronico: string;
    contraseña: string;
    administrador: IAdministradorTiendaResponse | null;
}
