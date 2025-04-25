import {
  IsInt,
  IsString,
  IsNotEmpty,
  Min,
  MaxLength,
  IsOptional,
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

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  tamano!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  temperatura!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  nivelDulzura!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  tipoLeche!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  extras?: string;
}
