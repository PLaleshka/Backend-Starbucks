import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class ProductoDTO {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  categoria!: string;

  @IsNumber()
  @IsNotEmpty()
  precio!: number;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
