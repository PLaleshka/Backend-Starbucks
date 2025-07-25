import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';
import { OpcionPersonalizacion } from './opcion-personalizacion.entity';

@Entity('producto_opcion')
export class ProductoOpcion {
  @PrimaryGeneratedColumn({ name: 'id_producto_opcion' })
  id!: number;

  @PrimaryColumn({ name: 'id_opcion' })
  idOpcion!: number;

  @ManyToOne(() => Producto, producto => producto.productoOpciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;

  @ManyToOne(() => OpcionPersonalizacion, opcion => opcion.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_opcion' })
  opcion!: OpcionPersonalizacion;
}
