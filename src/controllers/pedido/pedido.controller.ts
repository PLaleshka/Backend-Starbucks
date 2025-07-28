import { Body, Controller, Get, Param, Post, Put, Res, Delete, HttpException } from '@nestjs/common';
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
import { PedidoCreateRequestDTO } from './dto/PedidoCreateRequestDTO';


@Controller('api/pedido') 
export class PedidoController {
    private pedidos: IGetPedidoResponse[] = [

    ];

    constructor(private pedidoService: PedidoService) {}

    @Get()
    public getpedidos(): IGetPedidoResponse[] {
        return this.pedidos;
    }

   @Get(':id')
async getpedido(@Param('id') id: number): Promise<PedidoResponseDTO> {
  const pedido = await this.pedidoService.findById(id);
  if (!pedido) {
    throw new HttpException(`Pedido con id ${id} no encontrado`, 404);
  }
  return plainToInstance(PedidoResponseDTO, pedido, { excludeExtraneousValues: true });
}
    

    @Post()
    async createPedido(@Body() pedidoDto: PedidoCreateRequestDTO): Promise<PedidoResponseDTO> {
    const pedido = await this.pedidoService.crearPedido(pedidoDto);
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

