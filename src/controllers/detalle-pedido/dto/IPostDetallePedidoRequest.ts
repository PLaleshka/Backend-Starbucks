import { IsInt, Min, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IPostDetallePedidoRequest {
  @ApiProperty()
  @IsInt()
  @Min(1)
  idPedido!: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  idProducto!: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  cantidad!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  tamano?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  temperatura?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  nivelDulzura?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  tipoLeche?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  extras?: string;
}
