import { IsNotEmpty, IsNumber, IsString, IsPositive, IsOptional } from 'class-validator';

export class PedidoDTO {
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

    @IsOptional()
    @IsNumber()
    @IsPositive()
    tienda?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    barista?: number;

    @IsOptional()
    productos?: number[];
}

