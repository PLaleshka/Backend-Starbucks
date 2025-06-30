import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Ingrediente } from 'src/controllers/database/entities/ingrediente.entity';
import { IPutIngredienteRequest } from 'src/controllers/ingrediente/dto/IputIngredienteRequest';

@Injectable()
export class IngredienteService {
  constructor(
    @InjectRepository(Ingrediente)
    private readonly ingredienteRepository: Repository<Ingrediente>,
  ) {}

  async getAll(): Promise<Ingrediente[]> {
    return await this.ingredienteRepository.find();
  }

  async getById(id: number): Promise<Ingrediente> {
    const ingrediente = await this.ingredienteRepository.findOneBy({ idIngrediente: id });
    if (!ingrediente) throw new NotFoundException('Ingrediente no encontrado');
    return ingrediente;
  }

  async create(data: Partial<Ingrediente>): Promise<Ingrediente> {
    const nuevo = this.ingredienteRepository.create(data);
    return await this.ingredienteRepository.save(nuevo);
  }

  async update(id: number, data: IPutIngredienteRequest): Promise<UpdateResult> {
    return await this.ingredienteRepository.update(id, data);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.ingredienteRepository.delete(id);
  }
}
