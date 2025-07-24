import { IsOptional, IsInt, Min } from 'class-validator';

export class IPutStockRequest {
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidad?: number;
}