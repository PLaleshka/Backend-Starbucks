import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity({ name: 'cliente' })
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  idCliente!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ name: 'correo_electronico', unique: true })
  correoElectronico!: string;

  @Column()
  contraseña!: string;

  @OneToMany(() => Pedido, pedido => pedido.cliente)
  pedidos!: Pedido[];
}
