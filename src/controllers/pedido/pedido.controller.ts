import { Injectable, HttpException, Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Pedido } from 'src/controllers/database/entities/pedido.entity';
import { DetallePedido } from 'src/controllers/database/entities/detalle-pedido.entity';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';
import { PedidoCreateRequestDTO } from 'src/controllers/pedido/dto/PedidoCreateRequestDTO';
import { PedidoUpdateDTO } from 'src/controllers/pedido/dto/PedidoUpdateDTO';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Pedidos')
@Injectable()
@Controller('api/pedido')
export class PedidoController {
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

  @ApiOperation({ summary: 'Obtener todos los pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  public async getAllPedidos(): Promise<Pedido[]> {
    return await this.pedidoRepository.find({
      relations: ['cliente', 'barista', 'tienda'],
      order: { idPedido: 'ASC' }
    });
  }

  @ApiOperation({ summary: 'Obtener pedido por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
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

  @ApiOperation({ summary: 'Crear un pedido' })
  @ApiBody({ type: PedidoCreateRequestDTO })
  @ApiResponse({ status: 201, description: 'Pedido creado' })
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

    // Devuelve el pedido completo con relaciones
    const pedidoCompleto = await this.pedidoRepository.findOne({
      where: { idPedido: pedidoGuardado.idPedido },
      relations: ['cliente', 'tienda', 'detallePedidos', 'detallePedidos.producto'],
    });

    return pedidoCompleto;
  }

  @ApiOperation({ summary: 'Actualizar un pedido' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: PedidoUpdateDTO })
  @ApiResponse({ status: 200, description: 'Pedido actualizado' })
  async update(id: number, data: PedidoUpdateDTO): Promise<UpdateResult | undefined> {
    const updateData: any = { ...data };

    // Si se quiere actualizar el cliente y viene como número (ID)
    if (updateData.cliente && typeof updateData.cliente === 'number') {
      const cliente = await this.usuarioRepository.findOneBy({ idUsuario: updateData.cliente });
      if (!cliente || cliente.rol !== 'cliente') {
        throw new HttpException('Cliente no encontrado o rol incorrecto', 404);
      }
      updateData.cliente = cliente;
    }

    // Si se quiere actualizar la tienda y viene como número (ID)
    if (updateData.tienda && typeof updateData.tienda === 'number') {
      const tienda = await this.tiendaRepository.findOneBy({ idTienda: updateData.tienda });
      if (!tienda) {
        throw new HttpException('Tienda no encontrada', 404);
      }
      updateData.tienda = tienda;
    }

    const result = await this.pedidoRepository.update(id, updateData);
    return result.affected === 0 ? undefined : result;
  }

  @ApiOperation({ summary: 'Obtener pedidos por usuario' })
  @ApiParam({ name: 'idUsuario', type: Number })
  @ApiResponse({ status: 200, description: 'Pedidos del usuario' })
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

  @ApiOperation({ summary: 'Obtener pedidos por tienda' })
  @ApiParam({ name: 'idTienda', type: Number })
  @ApiResponse({ status: 200, description: 'Pedidos de la tienda' })
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

  @ApiOperation({ summary: 'Buscar pedido por ID (alternativo)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  async findById(id: number): Promise<Pedido | null> {
    return await this.pedidoRepository.findOne({
      where: { idPedido: id },
      relations: [
        'cliente',
        'barista',
        'tienda',
        'detallePedidos',
        'detallePedidos.producto'
      ]
    });
  }

  @ApiOperation({ summary: 'Eliminar pedido' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pedido eliminado' })
  async delete(id: number): Promise<DeleteResult | undefined> {
    return await this.pedidoRepository.delete(id);
  }
}
