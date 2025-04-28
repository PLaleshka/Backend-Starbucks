import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TiendaEntity } from "src/controllers/database/entities/tienda.entity";

@Entity({ name: 'administrador' })
export class AdministradorEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column()
    apellido!: string;

    @Column()
    contraseña!: string;

    @Column()
    correoElectronico!: string;

    @OneToMany(() => TiendaEntity, tienda => tienda.administrador)
    tiendas!: TiendaEntity[];
}
