import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class IPutDetallePedidoRequest {
  @ApiPropertyOptional({
    example: 2,
    description: 'Cantidad del producto (opcional)',
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  cantidad?: number;

  @ApiPropertyOptional({
    example: 'mediano',
    description: 'Tamaño del producto (opcional)',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  tamano?: string;

  @ApiPropertyOptional({
    example: 'frío',
    description: 'Temperatura del producto (opcional)',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  temperatura?: string;

  @ApiPropertyOptional({
    example: 'baja',
    description: 'Nivel de dulzura del producto (opcional)',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  nivelDulzura?: string;

  @ApiPropertyOptional({
    example: 'leche descremada',
    description: 'Tipo de leche del producto (opcional)',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  tipoLeche?: string;

  @ApiPropertyOptional({
    example: 'extra canela, doble shot',
    description: 'Extras agregados al producto (opcional)',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  extras?: string;
}
