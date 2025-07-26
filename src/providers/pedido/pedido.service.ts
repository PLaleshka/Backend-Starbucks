import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Pedido } from 'src/controllers/database/entities/pedido.entity';
import { PedidoUpdateDTO } from 'src/controllers/pedido/dto/PedidoUpdateDTO';
import { PedidoDTO } from 'src/controllers/pedido/dto/pedido.dto';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(TiendaEntity)
    private readonly tiendaRepository: Repository<TiendaEntity>,
  ) {}

  public async getAllPedidos(): Promise<Pedido[]> {
    return await this.pedidoRepository.find();
  }

  public async getPedido(id: number): Promise<Pedido> {
    try {
      const result = await this.pedidoRepository.createQueryBuilder('pedido')
        .where('pedido.idPedido = :id', { id })
        .getOne();

      if (!result) {
        throw new Error(`Pedido con id ${id} no encontrado`);
      }

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async create(pedidoDto: PedidoDTO): Promise<Pedido> {
    /* ───── datos fijos del pedido ───── */
    const pedido = new Pedido();
    pedido.fecha          = new Date();
    pedido.subtotal       = pedidoDto.subtotal;
    pedido.iva            = pedidoDto.iva;
    pedido.tiempoEstimado = pedidoDto.tiempoEstimado;
    pedido.estadoPedido   = pedidoDto.estadoPedido;

    /* ───── cliente ───── */
    const cliente = await this.usuarioRepository.findOneBy({
      idUsuario: pedidoDto.cliente,
    });
    if (!cliente || cliente.rol !== 'cliente') {
      throw new Error('Cliente no encontrado o rol incorrecto');
    }

    /* ───── tienda + baristas ───── */
    const tienda = await this.tiendaRepository.findOne({
      where: { idTienda: pedidoDto.tienda },
      relations: ['baristas'],           // ⚠️ importante para traer baristas
    });
    if (!tienda) throw new Error('Tienda no encontrada');

    const barista = tienda.baristas.find(
      (b) => b.rol === 'barista' && b.disponibilidad === 'disponible',
    );
    if (!barista) throw new Error('No hay baristas disponibles en esta tienda');

    /* ───── marcar barista ocupado ───── */
    barista.disponibilidad = 'no disponible';
    await this.usuarioRepository.save(barista);

    /* ───── vincular y guardar ───── */
    pedido.usuario = cliente;   // quien hace el pedido
    pedido.tienda  = tienda;
    pedido.barista = barista;

    return await this.pedidoRepository.save(pedido);
  }

  public async update(
    id: number,
    pedidoDto: PedidoUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    /* ---------- datos que se pueden actualizar ---------- */
    const updateData: Partial<Pedido> = {
      estadoPedido:   pedidoDto.estadoPedido,
      subtotal:       pedidoDto.subtotal,
      iva:            pedidoDto.iva,
      tiempoEstimado: pedidoDto.tiempoEstimado,
    };

    /* ---------- posible cambio de cliente ---------- */
    if (pedidoDto.cliente) {
      const cliente = await this.usuarioRepository.findOneBy({
        idUsuario: pedidoDto.cliente,
      });
      if (!cliente || cliente.rol !== 'cliente') {
        throw new Error('Cliente no encontrado o rol incorrecto');
      }
      updateData.usuario = cliente;
    }

    /* ---------- actualizar pedido ---------- */
    const result = await this.pedidoRepository.update(id, updateData);
    if (!result.affected) return undefined;

    /* ---------- si se finaliza, liberar barista ---------- */
    if (pedidoDto.estadoPedido === 'finalizado') {
      const pedido = await this.pedidoRepository.findOne({
        where: { idPedido: id },
        relations: ['barista'],
      });

      if (pedido?.barista && pedido.barista.disponibilidad === 'no disponible') {
        pedido.barista.disponibilidad = 'disponible';
        await this.usuarioRepository.save(pedido.barista);
      }
    }

    return result;
  }

}
