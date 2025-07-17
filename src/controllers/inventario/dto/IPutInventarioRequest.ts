import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class IPutInventarioRequest {
  @ApiPropertyOptional({ example: 50, description: 'Cantidad a actualizar' })
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidad?: number;
}
