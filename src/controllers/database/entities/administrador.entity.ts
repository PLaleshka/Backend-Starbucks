import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tienda } from './tienda.entity';

@Entity({ name: 'administrador' })
export class AdministradorEntity {
  @PrimaryGeneratedColumn({ name: 'id_administrador' })
  idAdministrador!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column()
  contraseña!: string;

  @Column({ name: 'correo_electronico', unique: true })
  correoElectronico!: string;

  @OneToMany(() => Tienda, tienda => tienda.administrador)
  tiendas!: Tienda[];
}
