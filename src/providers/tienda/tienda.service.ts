import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';

@Injectable()
export class TiendaService {
    constructor(
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>,

        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    public async getAllTiendas(): Promise<TiendaEntity[]> {
        return await this.tiendaRepository.find({
        relations: ['administrador'],
        });
    }

    public async updateTienda(
        id: number,
        tiendaData: Partial<TiendaEntity>,
    ): Promise<TiendaEntity | null> {
        const tienda = await this.tiendaRepository.findOne({
        where: { idTienda: id },
        relations: ['administrador'],
        });

        if (!tienda) {
        return null;
        }

        if (
        tiendaData.administrador &&
        tiendaData.administrador.idUsuario
        ) {
        const administrador = await this.usuarioRepository.findOneBy({
            idUsuario: tiendaData.administrador.idUsuario,
        });

        if (!administrador || administrador.rol !== 'administrador') {
            throw new Error('Administrador no encontrado o rol inválido');
        }

        tienda.administrador = administrador;
        }

        const updatedTienda = Object.assign(tienda, tiendaData);
        return await this.tiendaRepository.save(updatedTienda);
    }

    public async create(tienda: TiendaEntity): Promise<TiendaEntity> {
        const nuevaTienda = this.tiendaRepository.create(tienda);
        return await this.tiendaRepository.save(nuevaTienda);
    }

    public async delete(id: number): Promise<boolean> {
        const result = await this.tiendaRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
