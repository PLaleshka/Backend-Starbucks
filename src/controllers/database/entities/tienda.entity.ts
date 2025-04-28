import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdministradorEntity } from "src/controllers/database/entities/administrador.entity";

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

    @ManyToOne(() => AdministradorEntity, administrador => administrador.tiendas, {
    })
    administrador!: AdministradorEntity;
}
