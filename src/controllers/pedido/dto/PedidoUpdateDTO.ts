import { IsDate, IsNumber, IsPositive, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class PedidoUpdateDTO {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fecha!: Date;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    subtotal!: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    iva!: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    total!: number;

    @IsOptional()
    @IsString()
    tiempoEstimado!: string;

    @IsOptional()
    @IsString()
    estadoPedido!: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    cliente!: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    tienda?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    barista?: number;
}
