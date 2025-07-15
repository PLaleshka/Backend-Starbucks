import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Pedido } from 'src/controllers/database/entities/pedido.entity';
import { PedidoUpdateDTO } from 'src/controllers/pedido/dto/PedidoUpdateDTO';
import { PedidoDTO } from 'src/controllers/pedido/dto/pedido.dto';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';
import { DetallePedido } from 'src/controllers/database/entities/detalle-pedido.entity';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { Cupon } from 'src/controllers/database/entities/cupon.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(TiendaEntity)
    private readonly tiendaRepository: Repository<TiendaEntity>,

    @InjectRepository(DetallePedido)
    private readonly detalleRepository: Repository<DetallePedido>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Cupon)
    private readonly cuponRepository: Repository<Cupon>,
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
    const pedido = new Pedido();
    pedido.fecha = new Date();
    pedido.subtotal = pedidoDto.subtotal;
    pedido.iva = pedidoDto.iva;
    pedido.tiempoEstimado = pedidoDto.tiempoEstimado;
    pedido.estadoPedido = pedidoDto.estadoPedido;

    const cliente = await this.usuarioRepository.findOneBy({ idUsuario: pedidoDto.cliente });
    if (!cliente || cliente.rol !== 'cliente') throw new Error('Cliente no encontrado o rol incorrecto');

    const tienda = await this.tiendaRepository.findOneBy({ idTienda: pedidoDto.tienda });
    if (!tienda) throw new Error('Tienda no encontrada');

    let barista: Usuario | null = null;
    if (pedidoDto.barista) {
      barista = await this.usuarioRepository.findOneBy({ idUsuario: pedidoDto.barista });
      if (!barista || barista.rol !== 'barista') throw new Error('Barista no encontrado o rol incorrecto');
    }

    pedido.usuario = cliente;
    pedido.tienda = tienda;
    if (barista) pedido.barista = barista;

    const savedPedido = await this.pedidoRepository.save(pedido);

    // Generar cupones personalizados si aplica
    if (pedidoDto.productos && pedidoDto.productos.length > 0) {
      for (const idProducto of pedidoDto.productos) {
        const producto = await this.productoRepository.findOneBy({ idProducto });
        if (producto) {
          await this.generarCuponSiAplica(cliente, producto);
        }
      }
    }

    return savedPedido;
  }

  private async generarCuponSiAplica(usuario: Usuario, producto: Producto) {
    const codigo = `PROMO-${producto.nombre.toUpperCase().replace(/\s+/g, '')}-${usuario.idUsuario}`;

    const existente = await this.cuponRepository.findOne({ where: { codigo } });
    if (existente) return;

    const detalles = await this.detalleRepository.find({
      where: {
        pedido: { usuario: { idUsuario: usuario.idUsuario } },
        producto: { idProducto: producto.idProducto }
      },
      relations: ['pedido', 'producto'],
    });

    if (detalles.length >= 3) {
      const cupon = this.cuponRepository.create({
        codigo,
        descripcion: `50% de descuento en tu bebida favorita: ${producto.nombre}`,
        descuento: 50,
        personalizado: true,
        producto,
        usuario,
      });

      await this.cuponRepository.save(cupon);
    }
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
      if (!cliente || cliente.rol !== 'cliente') throw new Error('Cliente no encontrado o rol incorrecto');
      updateData.usuario = cliente;
    }

    const result = await this.pedidoRepository.update(id, updateData);
    return result.affected === 0 ? undefined : result;
  }
}
