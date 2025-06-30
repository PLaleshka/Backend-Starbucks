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

  @Column()
  tamano!: string;

  @Column()
  temperatura!: string;

  @Column({ name: 'nivel_dulzura' })
  nivelDulzura!: string;

  @Column({ name: 'tipo_leche' })
  tipoLeche!: string;

  @Column({ nullable: true, type: 'varchar' })
  extras!: string | null;


  @ManyToOne(() => Pedido, pedido => pedido.detallePedidos)
  @JoinColumn({ name: 'id_pedido' })
  pedido!: Pedido;

  @ManyToOne(() => Producto, producto => producto.detallePedidos)
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;
}
