import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  MaxLength,
} from 'class-validator';

export class IPutDetallePedidoRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  cantidad?: number;

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
  @MaxLength(100)
  extras?: string;
}
