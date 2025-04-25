import { Barista } from 'src/controllers/database/entities/barista.entity';

export interface IPostBaristaResponse {
  data: Barista | null;
  statusCode: number;
  statusDescription: string;
  errores: any;
}
