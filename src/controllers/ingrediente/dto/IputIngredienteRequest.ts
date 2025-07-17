import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class IPutIngredienteRequest {
  @ApiPropertyOptional({ example: 'Café descafeinado', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({ example: 'Variedad sin cafeína para bebidas personalizadas', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcion?: string;
}
