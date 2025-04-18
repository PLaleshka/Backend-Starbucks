export interface IPostPedidoRequest {
    fecha: Date;
    subtotal: number;
    iva: number;
    total: number;
    tiempoEstimado: string;
    estadoPedido: string;
    cliente: number;
}