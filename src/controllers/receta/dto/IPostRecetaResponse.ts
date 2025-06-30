import { Receta } from 'src/controllers/database/entities/receta.entity';

export interface IPostRecetaResponse {
  data: Receta | null;
  statusCode: number;
  statusDescription: string;
  errores: string[] | null;
}
