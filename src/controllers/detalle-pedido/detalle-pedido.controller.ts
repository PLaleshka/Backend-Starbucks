import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DetallePedidoService } from 'src/providers/detalle-pedido/detalle-pedido.service';
import { IPostDetallePedidoRequest } from './dto/IPostDetallePedidoRequest';
import { IPostDetallePedidoResponse } from './dto/IPostDetallePedidoResponse';
import { DetallePedido } from 'src/controllers/database/entities/detalle-pedido.entity';
import { UpdateResult } from 'typeorm';
import { IPutDetallePedidoRequest } from './dto/IPutDetallePedidoRequest';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('DetallePedido')
@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private readonly detalleService: DetallePedidoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los detalles de pedido' })
  @ApiResponse({ status: 200, description: 'Lista de detalles de pedido', type: [DetallePedido] })
  async getAll(): Promise<DetallePedido[]> {
    return await this.detalleService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo detalle de pedido' })
  @ApiBody({ type: IPostDetallePedidoRequest })
  @ApiResponse({ status: 200, description: 'Detalle de pedido creado correctamente', type: Object })
  async postDetalle(
    @Body() request: IPostDetallePedidoRequest,
  ): Promise<IPostDetallePedidoResponse> {
    const response: IPostDetallePedidoResponse = {
      data: null,
      statusCode: 200,
      statusDescription: 'Detalle de pedido agregado correctamente',
      errores: null,
    };

    try {
      const creado = await this.detalleService.create(request);
      response.data = creado;
    } catch (error: any) {
      response.statusCode = 500;
      response.statusDescription = 'Error al crear detalle de pedido';
      response.errores = [error.message];
    }

    return response;
  }

  @Delete(':idPedido/:idProducto')
  @ApiOperation({ summary: 'Eliminar un detalle de pedido por idPedido y idProducto' })
  @ApiParam({ name: 'idPedido', type: Number })
  @ApiParam({ name: 'idProducto', type: Number })
  @ApiResponse({ status: 200, description: 'Detalle eliminado correctamente' })
  async deleteDetalle(
    @Param('idPedido') idPedido: string,
    @Param('idProducto') idProducto: string,
  ): Promise<void> {
    await this.detalleService.delete(+idPedido, +idProducto);
  }

  @Put(':idPedido/:idProducto')
  @ApiOperation({ summary: 'Actualizar un detalle de pedido por idPedido y idProducto' })
  @ApiParam({ name: 'idPedido', type: Number })
  @ApiParam({ name: 'idProducto', type: Number })
  @ApiBody({ type: IPutDetallePedidoRequest })
  @ApiResponse({ status: 200, description: 'Detalle actualizado correctamente', type: UpdateResult })
  async updateDetalle(
    @Param('idPedido') idPedido: string,
    @Param('idProducto') idProducto: string,
    @Body() body: IPutDetallePedidoRequest,
  ): Promise<UpdateResult> {
    return await this.detalleService.update(+idPedido, +idProducto, body);
  }
}
