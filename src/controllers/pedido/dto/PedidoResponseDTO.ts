import { Expose, Type } from 'class-transformer';
import { DetallePedido } from '../../database/entities/detalle-pedido.entity';
import { TiendaEntity } from '../../database/entities/tienda.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PedidoResponseDTO {
  @ApiProperty()
  @Expose()
  idPedido!: number;

  @ApiProperty()
  @Expose()
  fecha!: Date;

  @ApiProperty()
  @Expose()
  subtotal!: number;

  @ApiProperty()
  @Expose()
  iva!: number;

  @ApiProperty({ description: 'Total calculado como subtotal + iva' })
  @Expose()
  get total(): number {
    return this.subtotal + this.iva;
  }

  @ApiProperty()
  @Expose()
  tiempoEstimado!: string;

  @ApiProperty()
  @Expose()
  estadoPedido!: string;

  @ApiProperty({ description: 'Información del cliente' })
  @Expose()
  cliente: any;

  @ApiProperty({ type: () => TiendaEntity })
  @Expose()
  @Type(() => TiendaEntity)
  tienda!: TiendaEntity;

  @ApiProperty({ type: () => DetallePedido, isArray: true })
  @Expose()
  @Type(() => DetallePedido)
  detallePedidos!: DetallePedido[];
}