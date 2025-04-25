import { IsDate, IsNotEmpty, IsNumber, IsString, IsPositive, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { FindOperator } from 'typeorm';

export class PedidoDTO {
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    fecha!: Date;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    subtotal!: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    iva!: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    total!: number;

    @IsNotEmpty()
    @IsString()
    tiempoEstimado!: string;

    @IsNotEmpty()
    @IsString()
    estadoPedido!: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    cliente!: number;
    tienda: number | FindOperator<number> | undefined;
    barista?: number | FindOperator<number> | undefined;
}

