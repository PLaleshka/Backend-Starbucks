import { Cliente } from 'src/controllers/database/entities/cliente.entity.ts'

export interface IPedidoResponse {
    idPedido: number;
    fecha: Date;
    subtotal: number;
    iva: number;
    total: number;
    tiempoEstimado: string;
    estadoPedido: string;
    cliente: Cliente;
}

