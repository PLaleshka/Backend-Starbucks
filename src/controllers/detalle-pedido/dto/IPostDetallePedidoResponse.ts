import { DetallePedido } from 'src/controllers/database/entities/detalle-pedido.entity';

export interface IPostDetallePedidoResponse {
  data: DetallePedido | null;
  statusCode: number;
  statusDescription: string;
  errores: any;
}
