import { Expose } from 'class-transformer';

export class UsuarioResponseDTO {
  @Expose()
  idUsuario!: number;

  @Expose()
  nombre!: string;

  @Expose()
  apellido!: string;

  @Expose()
  correoElectronico!: string;

  @Expose()
  rol!: string;
}