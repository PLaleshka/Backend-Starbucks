import { Producto } from "dist/controllers/database/entities/producto.entity";
import { Usuario } from "src/controllers/database/entities/usuario.entity";

export class CuponDTO {
  idCupon!: number;
  codigo!: string;
  descuento!: number;
  descripcion!: string;
  personalizado!: boolean;
  producto!: Producto;
  usuario!: Usuario;
}