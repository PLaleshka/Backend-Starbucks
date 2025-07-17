import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { DetallePedido } from 'src/controllers/database/entities/detalle-pedido.entity';
import { Pedido } from 'src/controllers/database/entities/pedido.entity';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { IPostDetallePedidoRequest } from 'src/controllers/detalle-pedido/dto/IPostDetallePedidoRequest';
import { IPutDetallePedidoRequest } from 'src/controllers/detalle-pedido/dto/IPutDetallePedidoRequest';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly detalleRepo: Repository<DetallePedido>,

    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,

    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  async getAll(): Promise<DetallePedido[]> {
    return await this.detalleRepo.find({
      relations: ['pedido', 'producto'],
    });
  }

  async create(dto: IPostDetallePedidoRequest): Promise<DetallePedido> {
    const pedido = await this.pedidoRepo.findOneBy({ idPedido: dto.idPedido });
    if (!pedido) throw new Error(`Pedido con ID ${dto.idPedido} no encontrado`);

    const producto = await this.productoRepo.findOneBy({ idProducto: dto.idProducto });
    if (!producto) throw new Error(`Producto con ID ${dto.idProducto} no encontrado`);

    const detalle = new DetallePedido();
    detalle.pedido = pedido;
    detalle.producto = producto;
    detalle.idPedido = dto.idPedido;
    detalle.idProducto = dto.idProducto;
    detalle.cantidad = dto.cantidad;
    detalle.tamano = dto.tamano ?? '';
    detalle.temperatura = dto.temperatura ?? '';
    detalle.nivelDulzura = dto.nivelDulzura ?? '';
    detalle.tipoLeche = dto.tipoLeche ?? '';
    detalle.extras = dto.extras ?? null;

    return await this.detalleRepo.save(detalle);
  }

  async update(
    idPedido: number,
    idProducto: number,
    data: IPutDetallePedidoRequest,
  ): Promise<UpdateResult> {
    return await this.detalleRepo.update({ idPedido, idProducto }, data);
  }

  async delete(idPedido: number, idProducto: number): Promise<void> {
    await this.detalleRepo.delete({ idPedido, idProducto });
  }
}
