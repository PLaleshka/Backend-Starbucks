import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Pedido } from 'src/controllers/database/entities/pedido.entity';
import { Cliente } from 'src/controllers/database/entities/cliente.entity';
import { PedidoUpdateDTO } from 'src/controllers/pedido/dto/PedidoUpdateDTO';
import { PedidoDTO } from 'src/controllers/pedido/dto/pedido.dto';
import { Barista } from 'src/controllers/database/entities/barista.entity';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(Pedido)
        private readonly pedidoRepository: Repository<Pedido>,

        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,

        @InjectRepository(Barista)
        private readonly baristaRepository: Repository<Barista>,

        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>,
    ) {}

    public async getAllPedidos(): Promise<Pedido[]> {
        const result = this.pedidoRepository.find();
        return await this.pedidoRepository.find();
    }

    public async getPedido(id: number): Promise<Pedido> {
        try {
            const result = await this.pedidoRepository.createQueryBuilder('pedido')
                                                        .where(
                                                            'pedido.id = :id', { id }
                                                        )
                                                        .getOne();
            if (!result) {
                throw new Error(`Pedido con id ${id} no encontrado`);
            }
            return result;
        }
        catch (error: any) {
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
      
        const cliente = await this.clienteRepository.findOneBy({ idCliente: pedidoDto.cliente });
        if (!cliente) throw new Error('Cliente no encontrado');
      
        const tienda = await this.tiendaRepository.findOneBy({ idTienda: pedidoDto.tienda });
        if (!tienda) throw new Error('Tienda no encontrada');
      
        let barista: Barista | null = null;
        if (pedidoDto.barista) {
          barista = await this.baristaRepository.findOneBy({ idBarista: pedidoDto.barista });
          if (!barista) throw new Error('Barista no encontrado');
        }
      
        pedido.cliente = cliente;
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
            const cliente = await this.clienteRepository.findOneBy({ idCliente: pedidoDto.cliente });
            if (!cliente) throw new Error('Cliente no encontrado');
            updateData.cliente = cliente;
        }
      
        const result = await this.pedidoRepository.update(id, updateData);
      
        return result.affected === 0 ? undefined : result;
      }
      
}