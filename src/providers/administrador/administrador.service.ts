import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministradorEntity } from 'src/controllers/database/entities/administrador.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministradorService {
    constructor(
        @InjectRepository(AdministradorEntity) 
        private readonly adminRepository: Repository<AdministradorEntity>,
        ){}

    public async getAllUser(): Promise<AdministradorEntity[]>{
        const result = this.adminRepository.find();
        return result
    }

    public async create(administrador: AdministradorEntity): Promise<AdministradorEntity> {
        const result  = this.adminRepository.create(administrador);

        return await this.adminRepository.save(result);
    }

    public async getUserById(id: number): Promise<AdministradorEntity | null> {
        const result = await this.adminRepository.findOne({
            where: { id: id },
            relations: ['tiendas'],  // Esto carga las tiendas asociadas al administrador
        });
        return result;
    }
    

    public async updateUser(id: number, administradorData: Partial<AdministradorEntity>): Promise<AdministradorEntity | null> {
        const administrador = await this.adminRepository.findOneBy({ id: id });
    
        if (!administrador) {
            return null;
        }
    
        // Actualiza los campos existentes con los datos nuevos
        const updatedAdmin = Object.assign(administrador, administradorData);
    
        // Guarda en base de datos
        return await this.adminRepository.save(updatedAdmin);
    }

    // src/providers/administrador/administrador.service.ts

    public async deleteUser(id: number): Promise<boolean> {
        const result = await this.adminRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }

    
}
