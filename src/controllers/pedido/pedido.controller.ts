import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
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

@Controller('api/pedido') // Se elige esta ruta por ser más estándar y RESTful
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Get()
  public async getPedidos(): Promise<Pedido[]> {
    return await this.pedidoService.getAllPedidos();
  }

  @Get(':id')
  async getPedido(@Param('id') id: number): Promise<Pedido> {
    const pedido = await this.pedidoService.getPedido(id);
    return pedido;
  }

  @Get('tienda/:idTienda')
public async getPedidosPorTienda(@Param('idTienda') idTienda: number): Promise<Pedido[]> {
  return await this.pedidoService.getPedidosPorTienda(idTienda);
}


  @Get('usuario/:idUsuario')
public async getPedidosPorUsuario(@Param('idUsuario') idUsuario: number): Promise<Pedido[]> {
  return await this.pedidoService.getPedidosPorUsuario(idUsuario);
}


  @Post()
  async createPedido(@Body() pedidoDto: PedidoCreateRequestDTO): Promise<PedidoResponseDTO> {
    const pedido = await this.pedidoService.crearPedido(pedidoDto);
    return plainToInstance(PedidoResponseDTO, pedido, { excludeExtraneousValues: true });
  }

  @Put(':id')
  async putPedido(
    @Param('id') id: number,
    @Body() request: PedidoUpdateDTO,
    @Res() response: Response,
  ): Promise<UpdateResult | undefined> {
    return await this.pedidoService.update(id, request);
  }

  
}
