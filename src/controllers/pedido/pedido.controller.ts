import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { PedidoService } from 'src/providers/pedido/pedido.service';
import { PedidoDTO } from './dto/pedido.dto';
import { PedidoUpdateDTO } from './dto/PedidoUpdateDTO';
import { PedidoResponseDTO } from './dto/PedidoResponseDTO';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Controller('Pedido')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Get()
  async getAllPedidos(): Promise<PedidoResponseDTO[]> {
    const pedidos = await this.pedidoService.findAll();
    return pedidos.map((pedido) =>
      plainToInstance(PedidoResponseDTO, pedido, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @Get(':id')
  async getPedido(@Param('id') id: number): Promise<PedidoResponseDTO> {
    const pedido = await this.pedidoService.findById(id);
    if (!pedido) {
      throw new Error(`Pedido con id ${id} no encontrado`);
    }
    return plainToInstance(PedidoResponseDTO, pedido, {
      excludeExtraneousValues: true,
    });
  }

  @Get('cliente/:id')
  async getPedidosByClienteId(@Param('id') id: number): Promise<PedidoResponseDTO[]> {
    const pedidos = await this.pedidoService.findByClienteId(id);
    return pedidos.map((pedido) =>
      plainToInstance(PedidoResponseDTO, pedido, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @Post()
  async createPedido(@Body() pedidoDto: PedidoDTO): Promise<PedidoResponseDTO> {
    const pedido = await this.pedidoService.create(pedidoDto);
    return plainToInstance(PedidoResponseDTO, pedido, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  async updatePedido(
    @Param('id') id: number,
    @Body() request: PedidoUpdateDTO,
    @Res() response: Response,
  ): Promise<UpdateResult | undefined> {
    return await this.pedidoService.update(id, request);
  }

  @Delete(':id')
  async deletePedido(@Param('id') id: number, @Res() response: Response): Promise<Response> {
    const deleted = await this.pedidoService.delete(id);
    if (!deleted) {
      return response.status(404).send();
    }
    return response.status(200).send();
  }
}
