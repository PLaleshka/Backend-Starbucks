import { Usuario } from 'src/controllers/database/entities/usuario.entity'

export interface IPedidoResponse {
    idPedido: number;
    fecha: Date;
    subtotal: number;
    iva: number;
    total: number;
    tiempoEstimado: string;
    estadoPedido: string;
    cliente: Usuario;
}

