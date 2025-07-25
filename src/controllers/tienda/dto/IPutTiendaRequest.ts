// src/controllers/tienda/dto/IPutTiendaRequest.ts
export interface IPutTiendaRequest {
    nombreTienda?: string;  // Los campos son opcionales
    horario?: string;
    ubicacion?: string;
    capacidad?: number;
    disponibilidad?: string;
    correoElectronico?: string;
    contraseña?: string;
    idAdministrador?: number;
}
