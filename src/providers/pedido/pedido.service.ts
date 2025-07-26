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
  

  async crearPedido(dto: PedidoCreateRequestDTO) {
    // Validar usuario y tienda
    const usuario = await this.usuarioRepository.findOneBy({ idUsuario: dto.id_usuario_cliente });
    if (!usuario) throw new HttpException('Usuario no encontrado', 404);

    const tienda = await this.tiendaRepository.findOneBy({ idTienda: dto.id_tienda });
    if (!tienda) throw new HttpException('Tienda no encontrada', 404);

    // Asignar barista automáticamente (ejemplo: el primero disponible)
    const barista = await this.usuarioRepository.findOne({
      where: { rol: 'barista', idTienda: tienda.idTienda },
    });

    

    // Calcular IVA (ejemplo 16%)
    const iva = +(dto.subtotal * 0.16).toFixed(2);

    // Crear pedido
    const pedido = new Pedido();
    pedido.usuario = usuario;
    pedido.tienda = tienda;
    pedido.barista = barista || undefined;
    pedido.subtotal = dto.subtotal;
    pedido.iva = iva;
    pedido.estadoPedido = 'pendiente'; // Estado inicial
    pedido.tiempoEstimado = '15'; // 
    pedido.fecha = new Date();

    const pedidoGuardado = await this.pedidoRepository.save(pedido);

    // Crear detalles del pedido
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

    // Devuelve el pedido y sus detalles
    const detalles = await this.detallePedidoRepository.find({
      where: { idPedido: pedidoGuardado.idPedido },
    });

    return {
      pedido: pedidoGuardado,
      detalles,
    };
  }

  async update(id: number, data: PedidoUpdateDTO): Promise<UpdateResult | undefined> {
  // Si el DTO trae solo el ID, conviértelo al formato esperado por TypeORM
  const updateData: any = { ...data };
  if (updateData.cliente && typeof updateData.cliente === 'number') {
    updateData.cliente = { idUsuario: updateData.cliente };
  }
  // Haz lo mismo para otras relaciones si es necesario

  return await this.pedidoRepository.update(id, updateData);
  }
}
