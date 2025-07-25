import { IGetTiendaResponse } from "./IGetTiendaResponse";

// src/controllers/tienda/dto/IPutTiendaResponse.ts
export interface IPutTiendaResponse {
    data: IGetTiendaResponse | null;
    statusCode: number;
    statusDescription: string;
    errors: any;
}
