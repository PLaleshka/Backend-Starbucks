import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barista } from 'src/controllers/database/entities/barista.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BaristaService {
  constructor(
    @InjectRepository(Barista)
    private readonly baristaRepository: Repository<Barista>,
  ) {}

  async create(barista: Barista): Promise<Barista> {
    const nuevo = this.baristaRepository.create(barista);
    return await this.baristaRepository.save(nuevo);
  }

  async getAllBaristas(): Promise<Barista[]> {
    return await this.baristaRepository.find();
  }
  
}
