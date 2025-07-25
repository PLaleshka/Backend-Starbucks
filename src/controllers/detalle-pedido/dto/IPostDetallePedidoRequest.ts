import {
  IsInt,
  Min,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class IPostDetallePedidoRequest {
  @IsInt()
  @Min(1)
  idPedido!: number;

  @IsInt()
  @Min(1)
  idProducto!: number;

  @IsInt()
  @Min(1)
  cantidad!: number;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  tamano?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  temperatura?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  nivelDulzura?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  tipoLeche?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  extras?: string;
}
