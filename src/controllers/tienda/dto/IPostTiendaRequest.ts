import { IsString, IsNotEmpty, IsInt, IsEmail, IsIn, IsOptional } from 'class-validator';

export class IPostTiendaRequest {
  @IsString()
  @IsNotEmpty()
  nombreTienda!: string;

  @IsString()
  @IsNotEmpty()
  horario!: string;

  @IsString()
  @IsNotEmpty()
  ubicacion!: string;

  @IsInt()
  capacidad!: number;

  @IsIn(['disponible', 'no disponible'])
  disponibilidad!: string;

  @IsEmail()
  correoElectronico!: string;

  @IsString()
  @IsNotEmpty()
  contraseña!: string;

  // Validación para asegurarnos de que idAdministrador no es opcional y puede ser nulo
  @IsOptional()
  @IsInt()
  idAdministrador!: number | null;
}
