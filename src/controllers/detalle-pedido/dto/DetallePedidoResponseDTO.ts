import { Expose } from 'class-transformer';

export class DetallePedidoResponseDTO {
  @Expose()
  idPedido!: number;

  @Expose()
  idProducto!: number;

  @Expose()
  cantidad!: number;

  @Expose()
  precioUnitario!: number;

  @Expose()
  precioTotal!: number;

  @Expose()
  detallePersonalizacion?: any;

  @Expose()
  get nombreProducto(): string {
    // Si producto está cargado, devuelve el nombre, si no, vacío
    // @ts-ignore
    return this.producto?.nombre ?? '';
  }
  @Expose()
    producto: any;
}