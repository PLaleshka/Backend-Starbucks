import { IsInt, Min } from 'class-validator';

export class IPostInventarioRequest {
  @IsInt()
  @Min(1)
  idTienda!: number;

  @IsInt()
  @Min(1)
  idIngrediente!: number;

  @IsInt()
  @Min(0)
  cantidad!: number;
}
