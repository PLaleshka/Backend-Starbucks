import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
    ManyToOne, OneToMany, JoinColumn
  } from 'typeorm';
  import { Cliente } from './cliente.entity';
  import { Barista } from './barista.entity';
  import { TiendaEntity } from './tienda.entity';
  import { DetallePedido } from './detalle-pedido.entity';
  
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
  
    @ManyToOne(() => Cliente, cliente => cliente.pedidos, { eager: true })
    @JoinColumn({ name: 'id_cliente' })
    cliente!: Cliente;
  
    @ManyToOne(() => Barista, barista => barista.pedidos, { nullable: true, eager: true })
    @JoinColumn({ name: 'id_barista' })
    barista?: Barista;
  
    @ManyToOne(() => TiendaEntity, tienda => tienda.pedidos, { eager: true })
    @JoinColumn({ name: 'id_tienda' })
    tienda!: TiendaEntity;
  
    @OneToMany(() => DetallePedido, dp => dp.pedido, { cascade: true, eager: true })
    detallePedidos!: DetallePedido[];
  }
  