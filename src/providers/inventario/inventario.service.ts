import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Inventario } from 'src/controllers/database/entities/inventario.entity';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';
import { Ingrediente } from 'src/controllers/database/entities/ingrediente.entity';
import { IPutInventarioRequest } from 'src/controllers/inventario/dto/IPutInventarioRequest';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly repo: Repository<Inventario>,

    @InjectRepository(TiendaEntity)
    private readonly tiendaRepo: Repository<TiendaEntity>,

    @InjectRepository(Ingrediente)
    private readonly ingredienteRepo: Repository<Ingrediente>,
  ) {}

  async getAll(): Promise<Inventario[]> {
    return await this.repo.find();
  }

  async create(data: { idTienda: number, idIngrediente: number, cantidad: number }): Promise<Inventario> {
    const tienda = await this.tiendaRepo.findOneBy({ idTienda: data.idTienda });
    if (!tienda) throw new Error('Tienda no encontrada');

    const ingrediente = await this.ingredienteRepo.findOneBy({ idIngrediente: data.idIngrediente });
    if (!ingrediente) throw new Error('Ingrediente no encontrado');

    const inventario = this.repo.create({
      cantidad: data.cantidad,
      tienda,
      ingrediente,
    });

    return await this.repo.save(inventario);
  }

  async update(id: number, data: IPutInventarioRequest): Promise<UpdateResult> {
    return await this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
