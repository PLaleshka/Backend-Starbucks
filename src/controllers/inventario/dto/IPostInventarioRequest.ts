import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IPostInventarioRequest {
  @ApiProperty({ example: 1, description: 'ID de la tienda' })
  @IsInt()
  @Min(1)
  idTienda!: number;

  @ApiProperty({ example: 5, description: 'ID del ingrediente' })
  @IsInt()
  @Min(1)
  idIngrediente!: number;

  @ApiProperty({ example: 100, description: 'Cantidad disponible' })
  @IsInt()
  @Min(0)
  cantidad!: number;
}
