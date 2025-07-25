import { Producto } from 'src/controllers/database/entities/producto.entity';

export interface IPostProductoResponse {
  data: Producto | null;
  statusCode: number;
  statusDescription: string;
  errores: any;
}
