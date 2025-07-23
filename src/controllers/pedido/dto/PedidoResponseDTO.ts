import { Expose, Type } from 'class-transformer';
import { DetallePedido } from '../../database/entities/detalle-pedido.entity';
import { TiendaEntity } from '../../database/entities/tienda.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PedidoResponseDTO {
  @ApiProperty({ example: 1, description: 'ID único del pedido' })
  @Expose()
  idPedido!: number;

  @ApiProperty({ example: '2025-07-22T14:30:00Z', description: 'Fecha de creación del pedido' })
  @Expose()
  fecha!: Date;

  @ApiProperty({ example: 50.75, description: 'Subtotal del pedido' })
  @Expose()
  subtotal!: number;

  @ApiProperty({ example: 9.65, description: 'Monto del IVA aplicado al pedido' })
  @Expose()
  iva!: number;

  @ApiProperty({ example: 60.4, description: 'Total calculado como subtotal + IVA' })
  @Expose()
  get total(): number {
    return this.subtotal + this.iva;
  }

  @ApiProperty({ example: '15 minutos', description: 'Tiempo estimado de preparación del pedido' })
  @Expose()
  tiempoEstimado!: string;

  @ApiProperty({ example: 'en preparación', description: 'Estado actual del pedido' })
  @Expose()
  estadoPedido!: string;

  @ApiProperty({
    description: 'Información básica del cliente',
    example: {
      idUsuario: 3,
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
    },
  })
  @Expose()
  cliente: any; // Idealmente usa un DTO o entidad decorada

  @ApiProperty({ type: () => TiendaEntity, description: 'Tienda asignada al pedido' })
  @Expose()
  @Type(() => TiendaEntity)
  tienda!: TiendaEntity;

  @ApiProperty({
    type: () => DetallePedido,
    isArray: true,
    description: 'Lista de productos y configuraciones asociadas al pedido',
  })
  @Expose()
  @Type(() => DetallePedido)
  detallePedidos!: DetallePedido[];
}
