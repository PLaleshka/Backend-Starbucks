import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./producto.entity";
import { Usuario } from "./usuario.entity";

@Entity('cupon')
export class Cupon {
  @PrimaryGeneratedColumn({ name: 'id_cupon' })
  idCupon!: number;

  @Column({ unique: true })
  codigo!: string;

  @Column()
  descuento!: number;

  @Column()
  descripcion!: string;

  @Column({ default: false })
  personalizado!: boolean;

  @ManyToOne(() => Producto, producto => producto.cupones, { eager: true })
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;

  @ManyToOne(() => Usuario, usuario => usuario.cupones, { eager: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;
}
