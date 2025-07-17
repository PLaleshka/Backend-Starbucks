import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Producto } from './producto.entity';
import { Ingrediente } from './ingrediente.entity';

@Entity({ name: 'receta' })
export class Receta {
  @PrimaryColumn({ name: 'id_producto' })
  idProducto!: number;

  @PrimaryColumn({ name: 'id_ingrediente' })
  idIngrediente!: number;

  @Column()
  cantidad!: number;

  @ManyToOne(() => Producto, producto => producto.recetas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;

  @ManyToOne(() => Ingrediente, ingrediente => ingrediente.recetas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_ingrediente' })
  ingrediente!: Ingrediente;
}
