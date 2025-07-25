import { IsInt, Min } from 'class-validator';

export class IPostStockRequest {
  @IsInt()
  @Min(1)
  idTienda!: number;

  @IsInt()
  @Min(1)
  idProducto!: number;

  @IsInt()
  @Min(0)
  cantidad!: number;
}