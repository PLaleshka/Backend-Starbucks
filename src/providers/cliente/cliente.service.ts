import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Cliente } from 'src/controllers/database/entities/cliente.entity';
import { ClienteUpdateDTO } from 'src/controllers/cliente/dto/ClienteUpdateDTO';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) {}

    public async getAllClientes(): Promise<Cliente[]> {
        return await this.clienteRepository.find();
    }

    public async getCliente(id: number): Promise<Cliente> {
        try {
            const result = await this.clienteRepository.createQueryBuilder('cliente')
                                                        .where(
                                                            'cliente.id = :id', { id }
                                                        )
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

    public async create(cliente: Cliente): Promise<Cliente> {
        const result = this.clienteRepository.create(cliente);
        return await this.clienteRepository.save(result);
    }

    public async update(id: number, cliente: ClienteUpdateDTO): Promise<UpdateResult | undefined> {
        const result: UpdateResult = await this.clienteRepository.update(id, cliente);
    
        if (result.affected === 0) {
            return undefined;
        }
    
        // Devuelve el cliente actualizado desde la base de datos
        return result;
    }
}
