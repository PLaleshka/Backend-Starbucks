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

  public async findAll(): Promise<Pedido[]> {
    return await this.pedidoRepository.find();
  }

  public async findById(id: number): Promise<Pedido | null> {
    try {
      const result = await this.pedidoRepository
        .createQueryBuilder('pedido')
        .where('pedido.idPedido = :id', { id })
        .getOne();

      return result ?? null;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async findByClienteId(idCliente: number): Promise<Pedido[]> {
    return await this.pedidoRepository.find({
      where: {
        cliente: {
          idUsuario: idCliente,
        },
      },
    });
  }

  public async create(pedidoDto: PedidoDTO): Promise<Pedido> {
    const pedido = new Pedido();
    pedido.fecha = new Date();
    pedido.subtotal = pedidoDto.subtotal;
    pedido.iva = pedidoDto.iva;
    pedido.tiempoEstimado = pedidoDto.tiempoEstimado;
    pedido.estadoPedido = pedidoDto.estadoPedido;

    const cliente = await this.usuarioRepository.findOneBy({ idUsuario: pedidoDto.cliente });
    if (!cliente || cliente.rol !== 'cliente') {
      throw new Error('Cliente no encontrado o rol incorrecto');
    }

    const tienda = await this.tiendaRepository.findOneBy({ idTienda: pedidoDto.tienda });
    if (!tienda) {
      throw new Error('Tienda no encontrada');
    }

    let barista: Usuario | null = null;
    if (pedidoDto.barista) {
      barista = await this.usuarioRepository.findOneBy({ idUsuario: pedidoDto.barista });
      if (!barista || barista.rol !== 'barista') {
        throw new Error('Barista no encontrado o rol incorrecto');
      }
    }

    pedido.usuario = cliente;
    pedido.tienda = tienda;
    if (barista) pedido.barista = barista;

    return await this.pedidoRepository.save(pedido);
  }

  public async update(id: number, pedidoDto: PedidoUpdateDTO): Promise<UpdateResult | undefined> {
    const updateData: Partial<Pedido> = {
      estadoPedido: pedidoDto.estadoPedido,
      subtotal: pedidoDto.subtotal,
      iva: pedidoDto.iva,
      tiempoEstimado: pedidoDto.tiempoEstimado,
    };

    if (pedidoDto.cliente) {
      const cliente = await this.usuarioRepository.findOneBy({ idUsuario: pedidoDto.cliente });
      if (!cliente || cliente.rol !== 'cliente') {
        throw new Error('Cliente no encontrado o rol incorrecto');
      }
      updateData.usuario = cliente;
    }

    const result = await this.pedidoRepository.update(id, updateData);
    return result.affected === 0 ? undefined : result;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.pedidoRepository.delete(id);
    return result.affected !== 0;
  }
}
