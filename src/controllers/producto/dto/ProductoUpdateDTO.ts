import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductoUpdateDTO {
  @ApiPropertyOptional({ example: 'Café Espresso', description: 'Nuevo nombre del producto' })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({ example: 'Bebida caliente', description: 'Nueva categoría del producto' })
  @IsString()
  @IsOptional()
  categoria?: string;

  @ApiPropertyOptional({ example: 9.99, description: 'Nuevo precio del producto' })
  @IsNumber()
  @IsOptional()
  precio?: number;

  @ApiPropertyOptional({ example: 'Café negro fuerte', description: 'Nueva descripción del producto' })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
