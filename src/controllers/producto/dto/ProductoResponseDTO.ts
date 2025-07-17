import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductoResponseDTO {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Café Latte' })
  nombre!: string;

  @ApiProperty({ example: 'Bebida' })
  categoria!: string;

  @ApiProperty({ example: 12.99 })
  precio!: number;

  @ApiPropertyOptional({ example: 'Café con leche y espuma' })
  descripcion?: string;

  @ApiProperty({ example: '2025-07-16T12:34:56Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2025-07-17T08:00:00Z' })
  updatedAt!: Date;
}
