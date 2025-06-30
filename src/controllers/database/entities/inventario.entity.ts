import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, PrimaryColumn } from 'typeorm';
import { Ingrediente } from './ingrediente.entity';
import { Tienda } from './tienda.entity';

@Entity({ name: 'inventario' })
export class Inventario {
  @PrimaryColumn({ name: 'id_ingrediente' })
  idIngrediente!: number;

  @PrimaryColumn({ name: 'id_tienda' })
  idTienda!: number;

  @Column({ name: 'cantidad' })
  cantidad!: number;

  @ManyToOne(() => Ingrediente, ingrediente => ingrediente.inventarios, { eager: true })
  @JoinColumn({ name: 'id_ingrediente' })
  ingrediente!: Ingrediente;

  @ManyToOne(() => Tienda, tienda => tienda.inventarios, { eager: true })
  @JoinColumn({ name: 'id_tienda' })
  tienda!: Tienda;
}
