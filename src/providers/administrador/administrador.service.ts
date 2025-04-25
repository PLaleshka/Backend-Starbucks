import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrador } from 'src/controllers/database/entities/administrador.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(Administrador) 
        private readonly adminRepository: Repository<Administrador>,
        ){}
        public async getAllUser(): Promise<Administrador[]>{
            const result = this.adminRepository.find();
            return result
        }

    public async create(administrador: Administrador): Promise<Administrador> {
        const result  = this.adminRepository.create(administrador);

        return await this.adminRepository.save(result);
    }

}
