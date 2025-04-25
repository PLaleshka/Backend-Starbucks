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
  async postDetalle(@Body() request: IPostDetallePedidoRequest): Promise<IPostDetallePedidoResponse> {
    const response: IPostDetallePedidoResponse = {
      data: null,
      statusCode: 200,
      statusDescription: 'Detalle de pedido agregado correctamente',
      errores: null,
    };

    if (request) {
      const nuevoDetalle: DetallePedido = {
        idPedido: request.idPedido,
        idProducto: request.idProducto,
        cantidad: request.cantidad,
        tamano: request.tamano,
        temperatura: request.temperatura,
        nivelDulzura: request.nivelDulzura,
        tipoLeche: request.tipoLeche,
        extras: request.extras,
      } as DetallePedido;

      const creado = await this.detalleService.create(nuevoDetalle);
      response.data = creado;
    }

    return response;
  }

  @Delete(':idPedido/:idProducto')
  async deleteDetalle(@Param('idPedido') idPedido: string, @Param('idProducto') idProducto: string): Promise<void> {
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
