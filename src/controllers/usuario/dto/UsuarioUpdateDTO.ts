import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UsuarioUpdateDTO {
  @ApiPropertyOptional({ example: 'Juan', description: 'Nombre del usuario' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'Pérez', description: 'Apellido del usuario' })
  @IsOptional()
  @IsString()
  apellido?: string;

  @ApiPropertyOptional({ example: 'usuario@correo.com', description: 'Correo electrónico del usuario' })
  @IsOptional()
  @IsEmail()
  correoElectronico?: string;

  @ApiPropertyOptional({ example: 'nuevaContraseña123', description: 'Contraseña del usuario (mínimo 6 caracteres)' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  contraseña?: string;

  @ApiPropertyOptional({ example: 'barista', enum: ['cliente', 'barista', 'administrador'], description: 'Rol del usuario' })
  @IsOptional()
  @IsEnum(['cliente', 'barista', 'administrador'])
  rol?: 'cliente' | 'barista' | 'administrador';

  @ApiPropertyOptional({ example: '987654321', description: 'Número de celular del usuario (opcional)' })
  @IsOptional()
  @IsString()
  numeroCelular?: string;

  @ApiPropertyOptional({ example: '1234567', description: 'Teléfono adicional del usuario (opcional)' })
  @IsOptional()
  @IsString()
  telefono?: string;
}
