import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IPostRecetaRequest {
  @ApiProperty({
    example: 1,
    description: 'ID del producto al que se le agregará el ingrediente',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  idProducto!: number;

  @ApiProperty({
    example: 2,
    description: 'ID del ingrediente que se agregará al producto',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  idIngrediente!: number;

  @ApiProperty({
    example: 3,
    description: 'Cantidad del ingrediente que se agregará',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  cantidad!: number;
}
