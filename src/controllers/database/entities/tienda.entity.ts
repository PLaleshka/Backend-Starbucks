import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Inventario } from './inventario.entity';
import { Stock } from './stock.entity';
import { Usuario } from './usuario.entity';

@Entity({ name: 'tienda' })
export class TiendaEntity {
  @PrimaryGeneratedColumn({ name: 'id_tienda' })
  idTienda!: number;

  @Column()
  nombreTienda!: string;

  @Column()
  horario!: string;

  @Column()
  ubicacion!: string;

  @Column()
  capacidad!: number;

  @Column()
  disponibilidad!: string;

  @Column()
  correoElectronico!: string;

  @Column()
  contraseña!: string;

  @ManyToOne(() => Usuario, usuario => usuario.tiendasAdministradas, { nullable: true })
  @JoinColumn({ name: 'id_usuario_administrador' })
  administrador!: Usuario;

  @OneToMany(() => Usuario, usuario => usuario.tiendaTrabajo)
  baristas?: Usuario[];

  @OneToMany(() => Pedido, pedido => pedido.tienda)
  pedidos!: Pedido[];

  @OneToMany(() => Inventario, inventario => inventario.tienda)
  inventarios!: Inventario[];

  @OneToMany(() => Stock, stock => stock.tienda)
  stocks!: Stock[];
}
