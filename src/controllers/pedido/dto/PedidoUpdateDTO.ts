import { IsDate, IsNumber, IsPositive, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PedidoUpdateDTO {
  @ApiPropertyOptional({
    description: 'Fecha del pedido',
    example: '2023-07-16T12:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha?: Date;

  @ApiPropertyOptional({
    description: 'Subtotal del pedido',
    example: 30.00,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  subtotal?: number;

  @ApiPropertyOptional({
    description: 'IVA del pedido',
    example: 5.70,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  iva?: number;

  @ApiPropertyOptional({
    description: 'Total del pedido',
    example: 35.70,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  total?: number;

  @ApiPropertyOptional({
    description: 'Tiempo estimado de preparación',
    example: '10 minutos',
  })
  @IsOptional()
  @IsString()
  tiempoEstimado?: string;

  @ApiPropertyOptional({
    description: 'Estado actual del pedido',
    example: 'listo',
  })
  @IsOptional()
  @IsString()
  estadoPedido?: string;

  @ApiPropertyOptional({
    description: 'ID del cliente',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  cliente?: number;

  @ApiPropertyOptional({
    description: 'ID de la tienda',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  tienda?: number;

  @ApiPropertyOptional({
    description: 'ID del barista',
    example: 7,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  barista?: number;
}
