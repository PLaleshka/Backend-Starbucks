export interface IPutPedidoRequest {
    fecha?: Date;
    subtotal?: number;
    iva?: number;
    total?: number;
    tiempoEstimado?: string;
    estadoPedido?: string;
    cliente?: number;
}