export interface IPutCuponRequest {
  codigo?: string;
  descuento?: number;
  descripcion?: string;
  idProducto?: number;
  idUsuario?: number;
  personalizado?: boolean;
}