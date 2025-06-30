import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Inventario } from './inventario.entity';
import { Receta } from './receta.entity';

@Entity({ name: 'ingrediente' })
export class Ingrediente {
  @PrimaryGeneratedColumn({ name: 'id_ingrediente' })
  idIngrediente!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @OneToMany(() => Inventario, inventario => inventario.ingrediente)
  inventarios!: Inventario[];

  @OneToMany(() => Receta, receta => receta.ingrediente)
  recetas!: Receta[];
}
