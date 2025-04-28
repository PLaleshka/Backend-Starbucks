import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';
import { Repository } from 'typeorm';
import { AdministradorService } from '../administrador/administrador.service';

@Injectable()
export class TiendaService {
    constructor(
        @InjectRepository(TiendaEntity) 
        private readonly tiendaRepository: Repository<TiendaEntity>,
        private readonly administradorService: AdministradorService,
        ){}

    public async getAllTiendas(): Promise<TiendaEntity[]> {
        const tiendas = await this.tiendaRepository.find({
            relations: ['administrador'],
        });
        return tiendas;
    }

    public async updateTienda(id: number, tiendaData: Partial<TiendaEntity>): Promise<TiendaEntity | null> {
        const tienda = await this.tiendaRepository.findOne({
            where: { idTienda: id },
            relations: ['administrador'],  // Aseguramos que cargue la relación del administrador
        });

        if (!tienda) {
            return null;
        }

        // Si hay un idAdministrador en el request, buscar al administrador
        if (tiendaData.administrador && tiendaData.administrador.id) {
            const administrador = await this.administradorService.getUserById(tiendaData.administrador.id);

            if (!administrador) {
                throw new Error('Administrador no encontrado');
            }

            // Asignar el administrador a la tienda
            tienda.administrador = administrador;
        }

        // Actualizar otros campos
        const updatedTienda = Object.assign(tienda, tiendaData);

        // Guardar tienda actualizada
        return await this.tiendaRepository.save(updatedTienda);
    }
    
    public async create(tienda: TiendaEntity): Promise<TiendaEntity> {
        const result  = this.tiendaRepository.create(tienda);

        return await this.tiendaRepository.save(result);
    }

    public async delete(id: number): Promise<boolean> {
        const result = await this.tiendaRepository.delete(id);
        return (result.affected ?? 0) > 0;  // Retorna true si se eliminó, de lo contrario false
    }

}
