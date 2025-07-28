import {IsString,IsNotEmpty,IsInt,IsEmail,IsIn,IsOptional} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IPostTiendaRequest {
  @ApiProperty({
    example: 'Starbucks Central',
    description: 'Nombre de la tienda',
  })
  @IsString()
  @IsNotEmpty()
  nombreTienda!: string;

  @ApiProperty({
    example: '08:00 - 22:00',
    description: 'Horario de atención de la tienda',
  })
  @IsString()
  @IsNotEmpty()
  horario!: string;

  @ApiProperty({
    example: 'Av. Siempre Viva 123',
    description: 'Ubicación física de la tienda',
  })
  @IsString()
  @IsNotEmpty()
  ubicacion!: string;

  @ApiProperty({
    example: 50,
    description: 'Capacidad máxima de personas de la tienda',
  })
  @IsInt()
  capacidad!: number;

  @ApiProperty({
    example: 'disponible',
    description: 'Disponibilidad de la tienda',
    enum: ['disponible', 'no disponible'],
  })
  @IsIn(['disponible', 'no disponible'])
  disponibilidad!: string;

  @ApiProperty({
    example: 'tienda@correo.com',
    description: 'Correo electrónico de la tienda',
  })
  @IsEmail()
  correoElectronico!: string;

  @ApiProperty({
    example: 'miContraseña123',
    description: 'Contraseña de acceso de la tienda',
  })
  @IsString()
  @IsNotEmpty()
  contraseña!: string;

  @ApiPropertyOptional({
    example: 3,
    description: 'ID del administrador asignado a la tienda (puede ser null)',
  })
  @IsOptional()
  @IsInt()
  idAdministrador?: number | null; 
}
