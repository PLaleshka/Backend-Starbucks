export interface IGetUsuarioResponse {
    idUsuario: number;
    nombre: string;
    apellido: string;
    correoElectronico: string;
    contraseña: string;
    rol: 'cliente' | 'barista' | 'administrador';
    numeroCelular?: string | null;
    telefono?: string | null;
    disponibilidad: 'disponible' | 'no disponible';
}
