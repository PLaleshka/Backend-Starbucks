import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tienda } from 'src/controllers/database/entities/tienda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiendaService {
    constructor(
        @InjectRepository(Tienda) 
        private readonly tiendaRepository: Repository<Tienda>,
        ){}
        public async getAllUser(): Promise<Tienda[]>{
            const result = this.tiendaRepository.find();
            return result
        }
    
    public async create(tienda: Tienda): Promise<Tienda> {
    const result  = this.tiendaRepository.create(tienda);

    return await this.tiendaRepository.save(result);
    }
}
