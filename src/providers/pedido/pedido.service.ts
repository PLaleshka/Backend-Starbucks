import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Pedido } from 'src/controllers/database/entities/pedido.entity';
import { DetallePedido } from 'src/controllers/database/entities/detalle-pedido.entity';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';
import { PedidoCreateRequestDTO } from 'src/controllers/pedido/dto/PedidoCreateRequestDTO';
import { PedidoUpdateDTO } from 'src/controllers/pedido/dto/PedidoUpdateDTO';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(TiendaEntity)
    private readonly tiendaRepository: Repository<TiendaEntity>,
  ) {}

  // GET ALL pedidos
  public async getAllPedidos(): Promise<Pedido[]> {
    return await this.pedidoRepository.find({
      relations: ['cliente', 'barista', 'tienda'],
      order: { idPedido: 'ASC' }
    });
  }

  // GET pedido por ID
  public async getPedido(id: number): Promise<Pedido> {
    try {
      const result = await this.pedidoRepository.findOne({
        where: { idPedido: id },
        relations: [
          'cliente',
          'barista',
          'tienda',
          'detallePedidos',
          'detallePedidos.producto'
        ]
      });
      if (!result) {
        throw new HttpException('Pedido no encontrado', 404);
      }
      return result;
    } catch (error) {
      throw new HttpException('Pedido no encontrado', 404);
    }
  }

  // CREAR pedido
  async crearPedido(dto: PedidoCreateRequestDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ idUsuario: dto.id_usuario_cliente });
    if (!usuario) throw new HttpException('Usuario no encontrado', 404);

    const tienda = await this.tiendaRepository.findOneBy({ idTienda: dto.id_tienda });
    if (!tienda) throw new HttpException('Tienda no encontrada', 404);

    const barista = await this.usuarioRepository.findOne({
      where: { rol: 'barista', idTienda: tienda.idTienda },
    });

    const iva = +(dto.subtotal * 0.16).toFixed(2);

    const pedido = new Pedido();
    pedido.cliente = usuario;
    pedido.tienda = tienda;
    pedido.barista = barista || undefined;
    pedido.subtotal = dto.subtotal;
    pedido.iva = iva;
    pedido.estadoPedido = 'pendiente';
    pedido.tiempoEstimado = '15';
    pedido.fecha = new Date();

    const pedidoGuardado = await this.pedidoRepository.save(pedido);

    for (const prod of dto.productos) {
      const detalle = new DetallePedido();
      detalle.pedido = pedidoGuardado;
      detalle.producto = { idProducto: prod.idProducto } as any;
      detalle.idPedido = pedidoGuardado.idPedido;
      detalle.idProducto = prod.idProducto;
      detalle.cantidad = prod.cantidad;
      detalle.precioUnitario = prod.precioUnitario;
      detalle.precioTotal = prod.precioTotal;
      detalle.detallePersonalizacion = prod.detallePersonalizacion ?? null;
      await this.detallePedidoRepository.save(detalle);
    }

    const detalles = await this.detallePedidoRepository.find({
      where: { idPedido: pedidoGuardado.idPedido },
    });

    return {
      pedido: pedidoGuardado,
      detalles,
    };
  }

  // ACTUALIZAR pedido
  async update(id: number, pedidoDto: PedidoUpdateDTO): Promise<UpdateResult | undefined> {
    const updateData: any = { ...pedidoDto };

    if (pedidoDto.cliente && typeof pedidoDto.cliente === 'number') {
      const cliente = await this.usuarioRepository.findOneBy({ idUsuario: pedidoDto.cliente });
      if (!cliente || cliente.rol !== 'cliente') throw new Error('Cliente no encontrado o rol incorrecto');
      updateData.cliente = cliente;
    }

    const result = await this.pedidoRepository.update(id, updateData);
    return result.affected === 0 ? undefined : result;
  }

  public async getPedidosPorUsuario(idUsuario: number): Promise<Pedido[]> {
  const usuario = await this.usuarioRepository.findOne({
    where: { idUsuario },
  });

  if (!usuario) {
    throw new HttpException('Usuario no encontrado', 404);
  }

  const pedidos = await this.pedidoRepository.find({
    where: { cliente: { idUsuario } },
    relations: ['cliente', 'barista', 'tienda', 'detallePedidos', 'detallePedidos.producto'],
    order: { idPedido: 'DESC' }
  });

  if (!pedidos || pedidos.length === 0) {
    throw new HttpException('No se encontraron pedidos para este usuario', 404);
  }

  return pedidos;
}

public async getPedidosPorTienda(idTienda: number): Promise<Pedido[]> {
  const tienda = await this.tiendaRepository.findOne({
    where: { idTienda }
  });

  if (!tienda) {
    throw new HttpException('Tienda no encontrada', 404);
  }

  const pedidos = await this.pedidoRepository.find({
    where: { tienda: { idTienda } },
    relations: ['cliente', 'barista', 'tienda', 'detallePedidos', 'detallePedidos.producto'],
    order: { idPedido: 'DESC' }
  });

  if (!pedidos || pedidos.length === 0) {
    throw new HttpException('No se encontraron pedidos para esta tienda', 404);
  }

  return pedidos;
}

}