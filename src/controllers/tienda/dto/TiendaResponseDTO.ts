import { Expose } from 'class-transformer';

export class TiendaResponseDTO {
  @Expose()
  idTienda!: number;

  @Expose()
  nombreTienda!: string;

  @Expose()
  horario!: string;

  @Expose()
  ubicacion!: string;

  @Expose()
  capacidad!: number;

  @Expose()
  disponibilidad!: string;

  @Expose()
  correoElectronico!: string;
}