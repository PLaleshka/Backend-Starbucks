import { Body, Controller, Get, Param, Post, Put, Res, Delete } from '@nestjs/common';
import { IPedidoResponse as IGetPedidoResponse } from './dto/IGetPedidoResponse';
import { IPostPedidoRequest } from './dto/IPostPedidoRequest';
import { IPostPedidoResponse } from './dto/IPostPedidoResponse';
import { IPutPedidoRequest } from './dto/IPutPedidoRequest';
import { Response } from 'express';
import { PedidoService } from 'src/providers/pedido/pedido.service';
import { PedidoDTO } from './dto/pedido.dto';
import { Pedido } from 'src/controllers/database/entities/pedido.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { PedidoUpdateDTO } from './dto/PedidoUpdateDTO';
import { plainToInstance } from 'class-transformer';
import { PedidoResponseDTO } from './dto/PedidoResponseDTO';


@Controller('Pedido') 
export class PedidoController {
    private pedidos: IGetPedidoResponse[] = [

    ];

    constructor(private pedidoService: PedidoService) {}

    @Get()
    public getpedidos(): IGetPedidoResponse[] {
        return this.pedidos;
    }

    @Get(':id')
    public getpedido(@Param('id') id: number): IGetPedidoResponse {
            const pedido = this.pedidos.find(
                c => c.idPedido === Number(id)
            );
            if (!pedido) {
                throw new Error(`pedido con id ${Number(id)} no encontrado`);
            }
            return pedido;
    }
    

    @Post()
    async createPedido(@Body() pedidoDto: PedidoDTO): Promise<PedidoResponseDTO> {
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
    
        let isPedidoFound: boolean = false;

        this.pedidos.filter(
            (pedido) => {
                if (pedido.idPedido == id) {
                    this.pedidos.splice(pedido.idPedido, 1);
                    isPedidoFound = true;
                }
            }
        );

        if (!isPedidoFound) return response.status(404).send();
        
        return response.status(200).send();
    }
}

