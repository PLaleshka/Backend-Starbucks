import { IsInt, IsOptional, Min } from 'class-validator';

export class IPutInventarioRequest {
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidad?: number;
}
