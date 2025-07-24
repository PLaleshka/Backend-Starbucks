import { IsInt, Min } from 'class-validator';

export class IPostRecetaRequest {
  @IsInt()
  @Min(1)
  idProducto!: number;

  @IsInt()
  @Min(1)
  idIngrediente!: number;

  @IsInt()
  @Min(1)
  cantidad!: number;
}
