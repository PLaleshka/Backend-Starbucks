import { Expose } from 'class-transformer';

export class PedidoResponseDTO {
  @Expose()
  idPedido!: number;

  @Expose()
  fecha!: Date;

  @Expose()
  subtotal!: number;

  @Expose()
  iva!: number;

  @Expose()
  get total(): number {
    return this.subtotal + this.iva;
  }

  @Expose()
  tiempoEstimado!: string;

  @Expose()
  estadoPedido!: string;

  @Expose()
  cliente: any;
}
