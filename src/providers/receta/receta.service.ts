import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from 'src/controllers/database/entities/receta.entity';

@Injectable()
export class RecetaService {
  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepo: Repository<Receta>,
  ) {}

  async getAll(): Promise<Receta[]> {
    return await this.recetaRepo.find({
      relations: ['producto', 'ingrediente'],
    });
  }

  async create(data: Receta): Promise<Receta> {
    const nueva = this.recetaRepo.create(data);
    return await this.recetaRepo.save(nueva);
  }

  async delete(idProducto: number, idIngrediente: number): Promise<void> {
    await this.recetaRepo.delete({ idProducto, idIngrediente });
  }
}
