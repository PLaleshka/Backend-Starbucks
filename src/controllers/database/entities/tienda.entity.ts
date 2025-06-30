import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Administrador } from './administrador.entity';
import { Pedido } from './pedido.entity';
import { Inventario } from './inventario.entity';
import { Stock } from './stock.entity';

@Entity({ name: 'tienda' })
export class Tienda {
  @PrimaryGeneratedColumn({ name: 'id_tienda' })
  idTienda!: number;

  @Column({ name: 'nombre' })
  nombre!: string;

  @Column()
  horario!: string;

  @Column()
  ubicacion!: string;

  @Column()
  capacidad!: number;

  @Column()
  disponibilidad!: string;

  @Column({ name: 'correo_electronico', unique: true })
  correoElectronico!: string;

  @Column()
  contraseña!: string;

  @ManyToOne(() => Administrador, admin => admin.tiendas, { eager: true })
  @JoinColumn({ name: 'id_administrador' })
  administrador!: Administrador;

  @OneToMany(() => Pedido, pedido => pedido.tienda)
  pedidos!: Pedido[];

  @OneToMany(() => Inventario, inventario => inventario.tienda)
  inventarios!: Inventario[];

  @OneToMany(() => Stock, stock => stock.tienda)
stocks!: Stock[];
}
