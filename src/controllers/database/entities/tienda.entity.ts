<<<<<<< HEAD
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdministradorEntity } from "src/controllers/database/entities/administrador.entity";
import { Pedido } from "./pedido.entity";
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Administrador } from './administrador.entity';
import { Pedido } from './pedido.entity';
import { Inventario } from './inventario.entity';
import { Stock } from './stock.entity';
>>>>>>> barista-producto

@Entity({ name: 'tienda' })
export class TiendaEntity {
    @PrimaryGeneratedColumn()
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

    @ManyToOne(() => AdministradorEntity, administrador => administrador.tiendas, { nullable: true })
    @JoinColumn({ name: 'id_administrador' }) // <- este cambio es crucial
    administrador!: AdministradorEntity;

<<<<<<< HEAD
    @OneToMany(() => Pedido, pedido => pedido.tienda)
    pedidos!: Pedido[];
=======
  @OneToMany(() => Pedido, pedido => pedido.tienda)
  pedidos!: Pedido[];

  @OneToMany(() => Inventario, inventario => inventario.tienda)
  inventarios!: Inventario[];

  @OneToMany(() => Stock, stock => stock.tienda)
stocks!: Stock[];
>>>>>>> barista-producto
}
