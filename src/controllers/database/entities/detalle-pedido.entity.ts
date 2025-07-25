import {
  Entity, PrimaryColumn, Column,
  ManyToOne, JoinColumn
} from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from './producto.entity';

@Entity({ name: 'detalle_pedido' })
export class DetallePedido {
  @PrimaryColumn({ name: 'id_pedido' })
  idPedido!: number;

  @PrimaryColumn({ name: 'id_producto' })
  idProducto!: number;

  @Column()
  cantidad!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitario!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioTotal!: number;

  @Column({ type: 'json', nullable: true })
  detallePersonalizacion?: any;

  @ManyToOne(() => Pedido, pedido => pedido.detallePedidos)
  @JoinColumn({ name: 'id_pedido' })
  pedido!: Pedido;

  @ManyToOne(() => Producto, producto => producto.detallePedidos)
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;
}