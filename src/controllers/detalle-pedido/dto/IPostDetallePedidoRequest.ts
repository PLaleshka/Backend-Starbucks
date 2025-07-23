import { IsInt, Min, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  Min,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class IPostDetallePedidoRequest {
  @ApiProperty({
    example: 101,
    description: 'ID del pedido al que pertenece el detalle',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  idPedido!: number;

  @ApiProperty({
    example: 45,
    description: 'ID del producto que se está agregando al pedido',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  idProducto!: number;

  @ApiProperty({
    example: 2,
    description: 'Cantidad del producto',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  cantidad!: number;

  @ApiPropertyOptional({
    example: 'grande',
    description: 'Tamaño del producto (opcional)',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  tamano?: string;

  @ApiPropertyOptional({
    example: 'caliente',
    description: 'Temperatura del producto (opcional)',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  temperatura?: string;

  @ApiPropertyOptional({
    example: 'media',
    description: 'Nivel de dulzura (opcional)',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  nivelDulzura?: string;

  @ApiPropertyOptional({
    example: 'leche de almendra',
    description: 'Tipo de leche (opcional)',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  tipoLeche?: string;

  @ApiPropertyOptional({
    example: 'extra shot, caramelo',
    description: 'Extras del producto (opcional)',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  extras?: string;
}
