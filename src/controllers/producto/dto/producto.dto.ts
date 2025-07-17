import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductoDTO {
  @ApiProperty({ example: 'Café Latte', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: 'Bebida', description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty()
  categoria!: string;

  @ApiProperty({ example: 12.99, description: 'Precio del producto' })
  @IsNumber()
  @IsNotEmpty()
  precio!: number;

  @ApiPropertyOptional({ example: 'Café con leche y espuma', description: 'Descripción del producto' })
  @IsString()
  @IsOptional()
  descripcion?: string;
}