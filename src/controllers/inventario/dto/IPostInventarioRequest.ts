import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IPostInventarioRequest {
  @ApiProperty({
    example: 1,
    description: 'ID de la tienda asociada al inventario',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  idTienda!: number;

  @ApiProperty({
    example: 5,
    description: 'ID del ingrediente registrado en el inventario',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  idIngrediente!: number;

  @ApiProperty({
    example: 100,
    description: 'Cantidad disponible en inventario (puede ser 0)',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  cantidad!: number;
}
