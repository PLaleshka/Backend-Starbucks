import { IsString, IsNumber, IsOptional, IsDefined } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductoDTO {
  @ApiProperty({
    example: 'Café Latte',
    description: 'Nombre del producto',
  })
  @IsString()
  @IsDefined()
  nombre!: string;

  @ApiProperty({
    example: 'Bebida',
    description: 'Categoría del producto',
  })
  @IsString()
  @IsDefined()
  categoria!: string;

  @ApiProperty({
    example: 12.99,
    description: 'Precio del producto',
  })
  @IsNumber()
  @IsDefined()
  precio!: number;

  @ApiPropertyOptional({
    example: 'Café con leche y espuma',
    description: 'Descripción del producto',
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({
    example: 'https://miapp.com/images/latte.png',
    description: 'URL de la imagen del producto',
  })
  @IsString()
  @IsOptional()
  imagen?: string;
}
