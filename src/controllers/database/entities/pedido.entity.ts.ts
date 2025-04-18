import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from 'src/controllers/database/entities/cliente.entity.ts';
//import { Tienda } from 'src/controllers/database/entities/tienda.entity.ts';
import { OneToMany } from 'typeorm';
//import { PedidoProducto } from 'src/controllers/database/entities/pedido-producto.entity.ts';
import { Expose } from 'class-transformer';

@Entity({ name: 'pedidos' })
export class Pedido {

    @PrimaryGeneratedColumn({ name: 'id_pedido' })
    idPedido!: number;

    @CreateDateColumn({ name: 'fecha_pedido' })
    fecha!: Date;

    @Column({ name: 'subtotal' })
    subtotal!: number;

    @Column({ name: 'iva' })
    iva!: number;

    @Expose() 
    get total(): number {
        return this.subtotal + this.iva;
    }

    @Column({ name: 'tiempo_estimado' })
    tiempoEstimado!: string;

    @Column({ name: 'estado_pedido' })
    estadoPedido!: string;

    @ManyToOne(() => Cliente, cliente => cliente.pedidos, { eager: true })
    @JoinColumn({ name: 'id_cliente' })
    cliente!: Cliente;

    //@ManyToOne(() => Tienda, tienda => tienda.pedidos)
    //@JoinColumn({ name: 'id_tienda' })
    //tienda!: Tienda;

    //@OneToMany(() => PedidoProducto, pp => pp.pedido)
    //pedidosProductos: PedidoProducto[];
}