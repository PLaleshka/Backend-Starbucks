import { IsString, IsNotEmpty, IsEmail, IsInt, MinLength } from 'class-validator';

export class IPostAdministradorRequest {
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
  @MinLength(6)  // Contraseña debe tener al menos 6 caracteres
  contraseña!: string;
}
