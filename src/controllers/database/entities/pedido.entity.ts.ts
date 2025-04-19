import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from 'src/controllers/database/entities/cliente.entity.ts';
import { Expose } from 'class-transformer';

@Entity({ name: 'pedidos' })
export class Pedido {

    @PrimaryGeneratedColumn({ name: 'id_pedido' })
    idPedido!: number;

    @CreateDateColumn({ name: 'fecha_pedido' })
    fecha!: Date;

    @Column({ name: 'subtotal', type: 'decimal', precision: 10, scale: 2, nullable: false })
    subtotal!: number;

    @Column({ name: 'iva', type: 'decimal', precision: 10, scale: 2, nullable: false })
    iva!: number;

    @Expose() 
    get total(): number {
        return Number(this.subtotal) + Number(this.iva);
    }

    @Column({ name: 'tiempo_estimado', length: 50, nullable: false })
    tiempoEstimado!: string;

    @Column({ name: 'estado_pedido', length: 30, nullable: false })
    estadoPedido!: string;

    @ManyToOne(() => Cliente, cliente => cliente.pedidos, {
        eager: true,
        nullable: false,
        onDelete: 'CASCADE', // <- elimina el pedido si el cliente es borrado
    })
    @JoinColumn({ name: 'id_cliente' })
    cliente!: Cliente;
}
