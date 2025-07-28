import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class IPutInventarioRequest {
  @ApiPropertyOptional({
    example: 50,
    description: 'Nueva cantidad disponible en el inventario (puede ser 0)',
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidad?: number;
}
