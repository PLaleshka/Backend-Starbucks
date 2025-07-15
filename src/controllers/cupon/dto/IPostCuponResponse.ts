import { Cupon } from "src/controllers/database/entities/cupon.entity";

export interface IPostCuponResponse {
  data: Cupon | null;
  statusCode: number;
  statusDescription: string;
  errors: string[] | null;
}