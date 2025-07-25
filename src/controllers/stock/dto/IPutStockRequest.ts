import { IsInt, Min, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class IPutStockRequest {
  @ApiPropertyOptional({
    example: 50,
    description: 'Nueva cantidad del producto en stock',
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidad?: number;
}
