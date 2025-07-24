import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DetallePedidoService } from 'src/providers/detalle-pedido/detalle-pedido.service';
import { IPostDetallePedidoRequest } from './dto/IPostDetallePedidoRequest';
import { IPostDetallePedidoResponse } from './dto/IPostDetallePedidoResponse';
import { DetallePedido } from 'src/controllers/database/entities/detalle-pedido.entity';
import { UpdateResult } from 'typeorm';
import { IPutDetallePedidoRequest } from './dto/IPutDetallePedidoRequest';

@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private readonly detalleService: DetallePedidoService) {}

  @Get()
  async getAll(): Promise<DetallePedido[]> {
    return await this.detalleService.getAll();
  }

  @Post()
  async postDetalle(
    @Body() request: IPostDetallePedidoRequest
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
  async deleteDetalle(
    @Param('idPedido') idPedido: string,
    @Param('idProducto') idProducto: string
  ): Promise<void> {
    await this.detalleService.delete(+idPedido, +idProducto);
  }

  @Put(':idPedido/:idProducto')
  async updateDetalle(
    @Param('idPedido') idPedido: string,
    @Param('idProducto') idProducto: string,
    @Body() body: IPutDetallePedidoRequest,
  ): Promise<UpdateResult> {
    return await this.detalleService.update(+idPedido, +idProducto, body);
  }
}
