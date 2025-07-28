import { Expose, Type } from 'class-transformer';
import { UsuarioResponseDTO } from '../../usuario/dto/UsuarioResponseDTO';
import { TiendaResponseDTO } from '../../tienda/dto/TiendaResponseDTO';
import { DetallePedidoResponseDTO } from '../../detalle-pedido/dto/DetallePedidoResponseDTO';

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
  @Type(() => UsuarioResponseDTO)
  cliente!: UsuarioResponseDTO;

  @Expose()
  @Type(() => TiendaResponseDTO)
  tienda!: TiendaResponseDTO;

  @Expose()
  @Type(() => DetallePedidoResponseDTO)
  detallePedidos!: DetallePedidoResponseDTO[];
}
