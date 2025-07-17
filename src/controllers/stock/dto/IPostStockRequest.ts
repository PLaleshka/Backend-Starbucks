import { IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IPostStockRequest {
  @ApiProperty({ example: 1, description: 'ID de la tienda asociada al stock' })
  @IsInt()
  @Min(1)
  idTienda!: number;

  @ApiProperty({ example: 5, description: 'ID del producto asociado al stock' })
  @IsInt()
  @Min(1)
  idProducto!: number;

  @ApiProperty({ example: 100, description: 'Cantidad del producto en stock' })
  @IsInt()
  @Min(0)
  cantidad!: number;
}