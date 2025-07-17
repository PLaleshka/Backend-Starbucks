import { Stock } from 'src/controllers/database/entities/stock.entity';

export interface IPostStockResponse {
  data: Stock | null;
  statusCode: number;
  statusDescription: string;
  errores: string[] | null;
}