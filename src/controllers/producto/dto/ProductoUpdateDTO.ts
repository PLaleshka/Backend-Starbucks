import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ProductoUpdateDTO {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  categoria?: string;

  @IsNumber()
  @IsOptional()
  precio?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
