import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { Pedido } from 'src/controllers/database/entities/pedido.entity.ts';

@Entity({ name: 'Cliente' })
@Unique(['correoElectronico']) // ✅ El correo debe ser único
export class Cliente {
    @PrimaryGeneratedColumn({ name: 'id_cliente' })
    idCliente!: number;

    @Column({ name: 'nombre', nullable: false, length: 50 })
    nombre!: string;

    @Column({ name: 'apellido', nullable: false, length: 50 })
    apellido!: string;

    @Column({ 
        name: 'correo_electronico', 
        nullable: false, 
        length: 100 
    })
    correoElectronico!: string;

    @Column({ 
        name: 'contraseña', 
        nullable: false,
        length: 100 
    })
    contraseña!: string;

    @OneToMany(() => Pedido, pedido => pedido.cliente, {
        cascade: true,
    })
    pedidos!: Pedido[];
}
