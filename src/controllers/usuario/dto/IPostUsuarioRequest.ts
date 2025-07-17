export interface IPostUsuarioRequest {
    nombre: string;
    apellido: string;
    correoElectronico: string;
    contraseña: string;
    rol: 'cliente' | 'barista' | 'administrador';
    numeroCelular?: string;
    telefono?: string;
}
