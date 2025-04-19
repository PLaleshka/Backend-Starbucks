import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Cliente } from 'src/controllers/database/entities/cliente.entity.ts';
import { ClienteUpdateDTO } from 'src/controllers/cliente/dto/ClienteUpdateDTO';
import { plainToInstance } from 'class-transformer';
import { ClienteDTO } from 'src/controllers/cliente/dto/cliente.dto';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) {}

    public async getAllClientes(): Promise<Cliente[]> {
        const result = this.clienteRepository.find();
        return await this.clienteRepository.find();
    }

    public async getCliente(id: number): Promise<Cliente> {
        try {
            const result = await this.clienteRepository
                .createQueryBuilder('cliente')
                .where('cliente.idCliente = :id', { id })
                .getOne();

            if (!result) {
                throw new Error(`Cliente con id ${id} no encontrado`);
            }
            return result;
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    public async create(dto: ClienteDTO): Promise<Cliente> {
        const cliente = plainToInstance(Cliente, dto);
        return await this.clienteRepository.save(cliente);
    }

    public async update(id: number, cliente: ClienteUpdateDTO): Promise<UpdateResult | undefined> {
        const result: UpdateResult = await this.clienteRepository.update(id, cliente);
    
        if (result.affected === 0) {
            return undefined;
        }
    
        // Devuelve el cliente actualizado desde la base de datos
        return result;
    }

    public async delete(id: number): Promise<boolean> {
        const cliente = await this.clienteRepository.delete(id);
        return cliente.affected !== 0;
    }
}
