export interface IPutProductoResponse {
    id: number;
    nombre: string;
    categoria: string;
    precio: number;
    descripcion?: string;
    updatedAt: Date;
  }
  