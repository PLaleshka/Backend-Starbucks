import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UsuarioDTO {
  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
  @IsNotEmpty()
  @IsString()
  apellido!: string;

  @ApiProperty({ example: 'usuario@correo.com', description: 'Correo electrónico del usuario' })
  @IsNotEmpty()
  @IsEmail()
  correoElectronico!: string;

  @ApiProperty({ example: 'contraseña123', description: 'Contraseña del usuario (mínimo 6 caracteres)' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  contraseña!: string;

  @ApiProperty({ example: 'cliente', enum: ['cliente', 'barista', 'administrador'], description: 'Rol del usuario' })
  @IsNotEmpty()
  @IsEnum(['cliente', 'barista', 'administrador'])
  rol!: 'cliente' | 'barista' | 'administrador';

  @ApiPropertyOptional({ example: '987654321', description: 'Número de celular del usuario (opcional)' })
  @IsOptional()
  @IsString()
  numeroCelular?: string;

  @ApiPropertyOptional({ example: '1234567', description: 'Teléfono adicional del usuario (opcional)' })
  @IsOptional()
  @IsString()
  telefono?: string;
}