export interface IGetUsuarioResponse {
  idUsuario: number;
  nombre: string;
  apellido: string;
  numeroCelular: string;
  correoElectronico: string;
  contraseña: string;
  rol: 'cliente' | 'barista' | 'administrador';
  idTienda?: number;
}
