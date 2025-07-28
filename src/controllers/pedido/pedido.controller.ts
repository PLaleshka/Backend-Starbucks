import { Body, Controller, Get, Param, Post, Put, Res, Delete, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { PedidoService } from 'src/providers/pedido/pedido.service';
import { Pedido } from 'src/controllers/database/entities/pedido.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { PedidoUpdateDTO } from './dto/PedidoUpdateDTO';
import { plainToInstance } from 'class-transformer';
import { PedidoResponseDTO } from './dto/PedidoResponseDTO';
import { PedidoCreateRequestDTO } from './dto/PedidoCreateRequestDTO';

@Controller('api/pedido')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Get()
  public async getPedidos(): Promise<Pedido[]> {
    return await this.pedidoService.getAllPedidos();
  }

  @Get(':id')
  async getPedido(@Param('id') id: number): Promise<PedidoResponseDTO> {
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
  async putPedido(
    @Param('id') id: number,
    @Body() request: PedidoUpdateDTO
  ): Promise<UpdateResult | undefined> {
    return await this.pedidoService.update(id, request);
  }

  @Delete(':id')
  async deletePedido(@Param('id') id: number, @Res() response: Response): Promise<Response> {
    // Implementa aquí la lógica real de borrado usando el servicio
    // Por ejemplo:
    const result = await this.pedidoService.delete(id);
    if (!result) return response.status(404).send();
    return response.status(200).send();
  }

  @Get('tienda/:idTienda')
  public async getPedidosPorTienda(@Param('idTienda') idTienda: number): Promise<Pedido[]> {
    return await this.pedidoService.getPedidosPorTienda(idTienda);
  }

  @Get('usuario/:idUsuario')
  public async getPedidosPorUsuario(@Param('idUsuario') idUsuario: number): Promise<Pedido[]> {
    return await this.pedidoService.getPedidosPorUsuario(idUsuario);
  }
}
