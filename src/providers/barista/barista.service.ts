import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Barista } from 'src/controllers/database/entities/barista.entity';
import { BaristaUpdateDTO } from 'src/controllers/barista/dto/BaristaUpdateDTO';

@Injectable()
export class BaristaService {
    constructor(
        @InjectRepository(Barista)
        private readonly baristaRepository: Repository<Barista>,
    ) {}

    public async getAllBaristas(): Promise<Barista[]> {
        return await this.baristaRepository.find();
    }

    public async getBarista(id: number): Promise<Barista> {
        try {
<<<<<<< HEAD
            const result = await this.baristaRepository.createQueryBuilder('barista')
                .where('barista.id = :id', { id })
                .getOne();

            if (!result) {
                throw new Error(`Barista con id ${id} no encontrado`);
=======
            const result = await this.baristaRepository
              .createQueryBuilder('barista')
              .where('barista.idBarista = :id', { id })
              .getOne();

            if (!result) {
               throw new Error(`Barista con id ${id} no encontrado`);
>>>>>>> barista-producto
            }

            return result;
        } catch (error: any) {
<<<<<<< HEAD
=======
            console.error('ERROR EN getBarista:', error.message);
>>>>>>> barista-producto
            throw new Error(error);
        }
    }

    public async create(barista: Barista): Promise<Barista> {
        const result = this.baristaRepository.create(barista);
        return await this.baristaRepository.save(result);
    }

    public async update(id: number, baristaDto: BaristaUpdateDTO): Promise<UpdateResult | undefined> {
        const result: UpdateResult = await this.baristaRepository.update(id, baristaDto);

        if (result.affected === 0) {
            return undefined;
        }

        return result;
    }

    public async delete(id: number): Promise<DeleteResult> {
      return await this.baristaRepository.delete(id);
  }
}
