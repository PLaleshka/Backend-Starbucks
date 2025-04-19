import { Body, Controller, Get, Param, Post, Put, Res, Delete } from '@nestjs/common';
import { IPedidoResponse as IGetPedidoResponse } from './dto/IGetPedidoResponse';
import { Response } from 'express';
import { PedidoService } from 'src/providers/pedido/pedido.service';
import { PedidoDTO } from './dto/pedido.dto';
import { Pedido } from 'src/controllers/database/entities/pedido.entity.ts';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { PedidoUpdateDTO } from './dto/PedidoUpdateDTO';
import { plainToInstance } from 'class-transformer';
import { PedidoResponseDTO } from './dto/PedidoResponseDTO';



@Controller('Pedido') 
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) {}
    private pedidos: IGetPedidoResponse[] = [
        {
            idPedido: 1,
            fecha: new Date(),
            subtotal: 100,
            iva: 19,
            total: 119,
            tiempoEstimado: '30 minutos',
            estadoPedido: 'En preparación',
            cliente: {
                idCliente: 1,
                nombre: 'Juan Pérez',
                apellido: 'Gómez',
                correoElectronico: 'juanperez@example.com',
                contraseña: 'password',
                pedidos: []
              },
        },
        {
            idPedido: 2,
            fecha: new Date(),
            subtotal: 200,
            iva: 38,
            total: 238,
            tiempoEstimado: '30 minutos',
            estadoPedido: 'En preparación',
            cliente: {
                idCliente: 2,
                nombre: 'María López',
                apellido: 'Hernández',
                correoElectronico: 'marialopez@example.com',
                contraseña: 'securepassword',
                pedidos: []
              },
        },
    ];


    @Get()
    public getpedidos(): IGetPedidoResponse[] {
        return this.pedidos;
    }

    @Get(':id')
    public async getPedido(@Param('id') id: number): Promise<IGetPedidoResponse> {
        return await this.pedidoService.getPedido(Number(id));
    }

    

    @Post()
    async createPedido(@Body() pedidoDto: PedidoDTO): Promise<Pedido> {
        const pedido = await this.pedidoService.create(pedidoDto);
        return plainToInstance(PedidoResponseDTO, pedido, { excludeExtraneousValues: true });
    }

    @Put(':id')
    async putpedido(
        @Param('id') id: number,
        @Body() request: PedidoUpdateDTO,
        @Res() response: Response,
    ): Promise<UpdateResult | undefined> {

        return await this.pedidoService.update(id, request);
    }

    @Delete(':id')
    async deletepedido(@Param('id') id: number, @Res() response: Response): Promise<Response> {
        if (isNaN(id)) return response.status(400).send();

        const result = await this.pedidoService.delete(Number(id)); // usamos el servicio, no el repositorio

        if (!result) {
            return response.status(404).send({ message: 'Pedido no encontrado' });
        }

        return response.status(200).send({ message: 'Pedido eliminado correctamente' });
    }
}

