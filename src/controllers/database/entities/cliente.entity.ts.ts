import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Pedido } from 'src/controllers/database/entities/pedido.entity.ts';

@Entity({ name: 'Cliente' })
export class Cliente {
    @PrimaryGeneratedColumn({ name: 'id_cliente' })
    idCliente!: number;

    @Column({ name: 'nombre' })
    nombre!: string;

    @Column({ name: 'apellido' })
    apellido!: string;

    @Column({ name: 'correo_electronico' })
    correoElectronico!: string;

    @Column({ name: 'contraseña' })
    contraseña!: string;

    @OneToMany(() => Pedido, pedido => pedido.cliente)
    pedidos!: Pedido[];
}