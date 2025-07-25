import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpcionPersonalizacion } from 'src/controllers/database/entities/opcion-personalizacion.entity';
import { IPostOpcionPersonalizacionRequest } from 'src/controllers/opcion-personalizacion/dto/IPostOpcionPersonalizacionRequest.dto';
import { IPutOpcionPersonalizacionRequest } from 'src/controllers/opcion-personalizacion/dto/IPutOpcionPersonalizacionRequest.dot';



@Injectable()
export class OpcionPersonalizacionService {
  constructor(
    @InjectRepository(OpcionPersonalizacion)
    private readonly repo: Repository<OpcionPersonalizacion>,
  ) {}

  findAll(): Promise<OpcionPersonalizacion[]> {
    return this.repo.find();
  }

  create(data: IPostOpcionPersonalizacionRequest): Promise<OpcionPersonalizacion> {
    return this.repo.save(data);
  }

  async update(data: IPutOpcionPersonalizacionRequest): Promise<OpcionPersonalizacion> {
    await this.repo.update(data.idOpcion, data);
    return this.repo.findOneOrFail({ where: { id: data.idOpcion } });
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}