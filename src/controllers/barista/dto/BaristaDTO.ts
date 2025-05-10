import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class BaristaDTO {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  apellido!: string;

  @IsEmail()
  @IsNotEmpty()
  correoElectronico!: string;

  @IsString()
  @IsNotEmpty()
  contraseña!: string;

  @IsString()
  @IsNotEmpty()
  telefono!: string;
}
