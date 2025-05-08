import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdministradorEntity } from "src/controllers/database/entities/administrador.entity";
import { Pedido } from "./pedido.entity";

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

    @OneToMany(() => Pedido, pedido => pedido.tienda)
    pedidos!: Pedido[];
}
