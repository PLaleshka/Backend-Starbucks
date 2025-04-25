import { Expose, Type } from 'class-transformer';
import { DetallePedido } from '../../database/entities/detalle-pedido.entity';
import { Tienda } from '../../database/entities/tienda.entity';

export class PedidoResponseDTO {
  @Expose()
  idPedido!: number;

  @Expose()
  fecha!: Date;

  @Expose()
  subtotal!: number;

  @Expose()
  iva!: number;

  @Expose()
  get total(): number {
    return this.subtotal + this.iva;
  }

  @Expose()
  tiempoEstimado!: string;

  @Expose()
  estadoPedido!: string;

  @Expose()
  cliente: any;

  @Expose()
  @Type(() => Tienda)
  tienda!: Tienda;

  @Expose()
  @Type(() => DetallePedido)
  detallePedidos!: DetallePedido[];
}
