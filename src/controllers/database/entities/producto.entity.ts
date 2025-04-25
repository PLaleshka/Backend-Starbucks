import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';

@Entity({ name: 'producto' })
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id_producto' })
  idProducto!: number;

  @Column()
  nombre!: string;

  @Column()
  tipo!: string;

  @Column()
  descripcion!: string;

  @Column({ name: 'tiempo_base' })
  tiempoBase!: number;

  @OneToMany(() => DetallePedido, dp => dp.producto)
  detallePedidos!: DetallePedido[];
}
