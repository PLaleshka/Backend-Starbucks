import { IsString, IsEmail, IsOptional } from 'class-validator';

export class BaristaUpdateDTO {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido?: string;

  @IsEmail()
  @IsOptional()
  correoElectronico?: string;

  @IsString()
  @IsOptional()
  contraseña?: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}
