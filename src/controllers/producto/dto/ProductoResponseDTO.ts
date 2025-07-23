import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductoResponseDTO {
  @ApiProperty({
    example: 1,
    description: 'ID único del producto',
  })
  id!: number;

  @ApiProperty({
    example: 'Café Latte',
    description: 'Nombre del producto',
  })
  nombre!: string;

  @ApiProperty({
    example: 'Bebida',
    description: 'Categoría del producto',
  })
  categoria!: string;

  @ApiProperty({
    example: 12.99,
    description: 'Precio del producto en moneda local',
  })
  precio!: number;

  @ApiPropertyOptional({
    example: 'Café con leche y espuma',
    description: 'Descripción opcional del producto',
  })
  descripcion?: string;

  @ApiProperty({
    example: '2025-07-16T12:34:56Z',
    description: 'Fecha de creación del producto',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2025-07-17T08:00:00Z',
    description: 'Última fecha de modificación del producto',
  })
  updatedAt!: Date;
}
