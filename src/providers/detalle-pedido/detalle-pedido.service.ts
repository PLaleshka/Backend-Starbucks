import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { DetallePedido } from 'src/controllers/database/entities/detalle-pedido.entity';
import { IPutDetallePedidoRequest } from 'src/controllers/detalle-pedido/dto/IPutDetallePedidoRequest';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly detalleRepo: Repository<DetallePedido>,
  ) {}

  async getAll(): Promise<DetallePedido[]> {
    return await this.detalleRepo.find({
      relations: ['pedido', 'producto'],
    });
  }

  async create(detalle: DetallePedido): Promise<DetallePedido> {
    const nuevo = this.detalleRepo.create(detalle);
    return await this.detalleRepo.save(nuevo);
  }

  async delete(idPedido: number, idProducto: number): Promise<void> {
    await this.detalleRepo.delete({ idPedido, idProducto });
  }

  async update(
    idPedido: number,
    idProducto: number,
    data: IPutDetallePedidoRequest,
  ): Promise<UpdateResult> {
    return await this.detalleRepo.update({ idPedido, idProducto }, data);
  }
}
