import { IsEmail, IsEnum, IsOptional, IsString, IsNumber, MinLength } from 'class-validator';

export class UsuarioUpdateDTO {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsEmail()
  correoElectronico?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  contraseña?: string;

  @IsOptional()
  @IsEnum(['cliente', 'barista', 'administrador'])
  rol?: 'cliente' | 'barista' | 'administrador';

  @IsOptional()
  @IsString()
  numeroCelular?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  // ✅ Campo adicional para permitir cambiar tienda desde el panel admin
  @IsOptional()
  @IsNumber()
  id_tienda?: number;
}
