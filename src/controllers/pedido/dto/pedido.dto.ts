import { IsNotEmpty, IsNumber, IsString, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PedidoDTO {
  @ApiProperty({ description: 'Subtotal del pedido', example: 50.75 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  subtotal!: number;

  @ApiProperty({ description: 'IVA aplicado al pedido', example: 9.65 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  iva!: number;

  @ApiPropertyOptional({ description: 'Total del pedido (subtotal + IVA)', example: 60.4 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  total?: number; // ✅ ahora sí es realmente opcional

  @ApiProperty({ description: 'Tiempo estimado de preparación', example: '15 minutos' })
  @IsNotEmpty()
  @IsString()
  tiempoEstimado!: string;

  @ApiProperty({ description: 'Estado del pedido', example: 'en preparación' })
  @IsNotEmpty()
  @IsString()
  estadoPedido!: string;

  @ApiProperty({ description: 'ID del cliente que hizo el pedido', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  cliente!: number;

  @ApiPropertyOptional({ description: 'ID de la tienda donde se realiza el pedido', example: 1 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  tienda?: number;
}
