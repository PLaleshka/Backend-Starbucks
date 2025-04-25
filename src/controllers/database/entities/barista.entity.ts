import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity({ name: 'barista' })
export class Barista {
  @PrimaryGeneratedColumn({ name: 'id_barista' })
  idBarista!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ name: 'correo_electronico', unique: true })
  correoElectronico!: string;

  @Column()
  contraseña!: string;

  @Column()
  telefono!: string;

  @OneToMany(() => Pedido, pedido => pedido.barista)
  pedidos!: Pedido[];
}
