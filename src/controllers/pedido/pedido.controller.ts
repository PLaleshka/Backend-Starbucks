import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
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

@ApiTags('Pedido')
@Controller('Pedido')
export class PedidoController {
  private pedidos: IGetPedidoResponse[] = [];

  constructor(private pedidoService: PedidoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pedidos (mocked)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos en memoria',
    type: [PedidoResponseDTO],
  })
  public getpedidos(): IGetPedidoResponse[] {
    return this.pedidos;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener pedido por ID (mocked)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Pedido encontrado',
    type: PedidoResponseDTO,
  })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  public getpedido(@Param('id') id: number): IGetPedidoResponse {
    const pedido = this.pedidos.find((c) => c.idPedido === Number(id));
    if (!pedido) {
      throw new NotFoundException(`Pedido con id ${Number(id)} no encontrado`);
    }
    return pedido;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiBody({ type: PedidoDTO })
  @ApiResponse({
    status: 201,
    description: 'Pedido creado exitosamente',
    type: PedidoResponseDTO,
  })
  async createPedido(@Body() pedidoDto: PedidoDTO): Promise<PedidoResponseDTO> {
    const pedido = await this.pedidoService.create(pedidoDto);
    return plainToInstance(PedidoResponseDTO, pedido, { excludeExtraneousValues: true });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un pedido existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: PedidoUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Pedido actualizado exitosamente',
    type: UpdateResult,
  })
  async putpedido(
    @Param('id') id: number,
    @Body() request: PedidoUpdateDTO,
    @Res() response: Response,
  ): Promise<UpdateResult | undefined> {
    return await this.pedidoService.update(id, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar pedido de la lista en memoria (mocked)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pedido eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async deletepedido(@Param('id') id: number, @Res() response: Response): Promise<Response> {
    if (isNaN(id)) return response.status(400).send();

    let isPedidoFound = false;
    this.pedidos = this.pedidos.filter((pedido) => {
      if (pedido.idPedido === id) {
        isPedidoFound = true;
        return false; // remove
      }
      return true;
    });

    if (!isPedidoFound) return response.status(404).send();

    return response.status(200).send({ message: 'Pedido eliminado correctamente' });
  }
}
