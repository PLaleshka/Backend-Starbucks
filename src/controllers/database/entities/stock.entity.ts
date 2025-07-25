import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { TiendaEntity } from './tienda.entity';
import { Producto } from './producto.entity';

@Entity({ name: 'stock' })
export class Stock {
  @PrimaryGeneratedColumn({ name: 'id_stock' })
  idStock!: number;

  @Column()
  cantidad!: number;

  @ManyToOne(() => TiendaEntity, tienda => tienda.stocks, { eager: true })
  @JoinColumn({ name: 'id_tienda' })
  tienda!: TiendaEntity;

  @ManyToOne(() => Producto, producto => producto.stocks, { eager: true })
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;
}
