import { Column, Entity, PrimaryGeneratedColumn, OneToMany, } from 'typeorm';
import { ProductoOpcion } from './producto-opcion.entity';

@Entity('opcion_personalizacion')
export class OpcionPersonalizacion {
  @PrimaryGeneratedColumn({ name: 'id_opcion' })
  id!: number;

  @Column()
  tipo!: string; // Ej: 'tamaño', 'leche', 'agregado'

  @Column()
  nombre!: string; // Ej: 'mediano', 'leche de almendras'

  @Column({ name: 'precio_adicional', type: 'decimal', precision: 10, scale: 2 })
  precioAdicional!: number;

  @OneToMany(() => ProductoOpcion, (po) => po.opcion)
  productos!: ProductoOpcion[];
}
