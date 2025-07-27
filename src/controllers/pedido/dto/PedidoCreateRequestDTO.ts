import { IsArray, IsNumber, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ProductoPedidoDTO {
  @IsNumber()
  idProducto!: number;

  @IsNumber()
  cantidad!: number;

  @IsNumber()
  precioUnitario!: number;

  @IsNumber()
  precioTotal!: number;

  @IsOptional()
  detallePersonalizacion?: any;
}

export class PedidoCreateRequestDTO {
  @IsNumber()
  id_usuario_cliente!: number;

  @IsNumber()
  id_tienda!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoPedidoDTO)
  productos!: ProductoPedidoDTO[];

  @IsNumber()
  subtotal!: number;
}