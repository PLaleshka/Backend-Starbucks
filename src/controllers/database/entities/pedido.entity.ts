import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
    ManyToOne, OneToMany, JoinColumn
  } from 'typeorm';
  import { TiendaEntity } from './tienda.entity';
  import { DetallePedido } from './detalle-pedido.entity';
import { Usuario } from './usuario.entity';
  
  @Entity({ name: 'pedido' })
  export class Pedido {
    @PrimaryGeneratedColumn({ name: 'id_pedido' })
    idPedido!: number;

    @CreateDateColumn({ name: 'fecha_pedido' })
    fecha!: Date;

    @Column({ name: 'subtotal' })
    subtotal!: number;

    @Column({ name: 'iva' })
    iva!: number;

    @Column({ name: 'tiempo_estimado' })
    tiempoEstimado!: string;

    @Column({ name: 'estado_pedido' })
    estadoPedido!: string;

    // Relación con cliente
    @ManyToOne(() => Usuario, usuario => usuario.pedidos, { eager: true })
    @JoinColumn({ name: 'id_usuario_cliente' })
    cliente!: Usuario;

    // Relación con barista (opcional)
    @ManyToOne(() => Usuario, usuario => usuario.pedidosAtendidos, {
      nullable: true,
      eager: true,
    })
    @JoinColumn({ name: 'id_usuario_barista' })
    barista?: Usuario;

    // Relación con tienda
    @ManyToOne(() => TiendaEntity, tienda => tienda.pedidos, { eager: true })
    @JoinColumn({ name: 'id_tienda' })
    tienda!: TiendaEntity;

    // Detalles del pedido
    @OneToMany(() => DetallePedido, dp => dp.pedido, {
      cascade: true,
      eager: true,
    })
    detallePedidos!: DetallePedido[];
  }
  