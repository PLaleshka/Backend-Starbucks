export interface IGetDetallePedidoResponse {
  idPedido: number;
  idProducto: number;
  cantidad: number;
  tamano: string;
  temperatura: string;
  nivelDulzura: string;
  tipoLeche: string;
  extras?: string;
}
