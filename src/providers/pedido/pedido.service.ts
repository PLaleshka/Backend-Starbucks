import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Pedido } from 'src/controllers/database/entities/pedido.entity.ts';
import { Cliente } from 'src/controllers/database/entities/cliente.entity.ts';
import { PedidoUpdateDTO } from 'src/controllers/pedido/dto/PedidoUpdateDTO';
import { PedidoDTO } from 'src/controllers/pedido/dto/pedido.dto';

@Injectable()
export class PedidoService {
    constructor(
        @InjectRepository(Pedido)
        private readonly pedidoRepository: Repository<Pedido>,

        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) {}

    public async getAllPedidos(): Promise<Pedido[]> {
        return await this.pedidoRepository.find();
    }

    public async getPedido(id: number): Promise<Pedido> {
        try {
            const result = await this.pedidoRepository
                .createQueryBuilder('pedido')
                .where('pedido.idPedido = :id', { id })
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
        if ((pedidoDto as any).idPedido !== undefined) {
            throw new Error('No está permitido definir manualmente el id del pedido');
        }
        
        const pedido = new Pedido();
        pedido.fecha = new Date();
        pedido.subtotal = pedidoDto.subtotal;
        pedido.iva = pedidoDto.iva;
        pedido.tiempoEstimado = pedidoDto.tiempoEstimado;
        pedido.estadoPedido = pedidoDto.estadoPedido;
      
        const cliente = await this.clienteRepository.findOneBy({ idCliente: pedidoDto.cliente });
        if (!cliente) throw new Error('Cliente no encontrado');
      
        pedido.cliente = cliente;
      
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
            const cliente = await this.clienteRepository.findOneBy({ idCliente: pedidoDto.cliente }); // asegúrate que sea "id" o "idCliente"
            if (!cliente) throw new Error('Cliente no encontrado');
            updateData.cliente = cliente;
        }
      
        const result = await this.pedidoRepository.update(id, updateData);
      
        return result.affected === 0 ? undefined : result;
      }

    public async delete(id: number): Promise<boolean> {
        const result = await this.pedidoRepository.delete(id);
        return result.affected !== 0;
    }
      
}