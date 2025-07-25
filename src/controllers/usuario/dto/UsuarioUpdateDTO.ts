import {IsEmail,IsEnum,IsOptional,IsString, MinLength} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

// Importa desde donde lo tengas o define nuevamente si es necesario
export enum RolUsuario {
  CLIENTE = 'cliente',
  BARISTA = 'barista',
  ADMINISTRADOR = 'administrador',
}

export class UsuarioUpdateDTO {
  @ApiPropertyOptional({
    example: 'Juan',
    description: 'Nombre del usuario',
  })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({
    example: 'Pérez',
    description: 'Apellido del usuario',
  })
  @IsOptional()
  @IsString()
  apellido?: string;

  @ApiPropertyOptional({
    example: 'usuario@correo.com',
    description: 'Correo electrónico del usuario',
  })
  @IsOptional()
  @IsEmail()
  correoElectronico?: string;

  @ApiPropertyOptional({
    example: 'nuevaContraseña123',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  contraseña?: string;

  @ApiPropertyOptional({
    example: RolUsuario.BARISTA,
    enum: RolUsuario,
    description: 'Rol del usuario',
  })
  @IsOptional()
  @IsEnum(RolUsuario)
  rol?: RolUsuario;

  @ApiPropertyOptional({
    example: '987654321',
    description: 'Número de celular del usuario (opcional)',
  })
  @IsOptional()
  @IsString()
  numeroCelular?: string;

  @ApiPropertyOptional({
    example: '1234567',
    description: 'Teléfono adicional del usuario (opcional)',
  })
  @IsOptional()
  @IsString()
  telefono?: string;
}
