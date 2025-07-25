import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Pedido } from './pedido.entity';
import { TiendaEntity } from './tienda.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ unique: true })
  correoElectronico!: string;

  @Column()
  contraseña!: string;

  @Column({ type: 'enum', enum: ['cliente', 'barista', 'administrador'] })
  rol!: 'cliente' | 'barista' | 'administrador';

  @Column({ nullable: true })
  telefono?: string;

  @Column({ nullable: true })
  numeroCelular?: string;

  // CLIENTE: pedidos realizados
  @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos?: Pedido[];

  // BARISTA: pedidos atendidos
  @OneToMany(() => Pedido, pedido => pedido.barista)
  pedidosAtendidos?: Pedido[];

  // ADMINISTRADOR: tiendas que administra
  @OneToMany(() => TiendaEntity, tienda => tienda.administrador)
  tiendasAdministradas?: TiendaEntity[];

  // BARISTA: referencia al ID de la tienda
  @Column({ name: 'id_tienda', nullable: true })
  idTienda?: number;

  // BARISTA: tienda donde trabaja
  @ManyToOne(() => TiendaEntity, tienda => tienda.baristas)
  @JoinColumn({ name: 'id_tienda' })
  tiendaTrabajo?: TiendaEntity;
}
