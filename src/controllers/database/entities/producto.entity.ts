import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';

@Entity({ name: 'producto' })
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id_producto' })
  idProducto!: number;

  @Column()
  nombre!: string;

  @Column()
  categoria!: string;

  @Column({ nullable: true })
  descripcion!: string;

  @Column()
  precio!: number;

  @Column({ name: 'tiempo_base' })
  tiempoBase!: number;

  @OneToMany(() => DetallePedido, dp => dp.producto)
  detallePedidos!: DetallePedido[];
}
