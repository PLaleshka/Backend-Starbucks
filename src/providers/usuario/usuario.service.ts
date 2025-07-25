import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';
import { UsuarioUpdateDTO } from 'src/controllers/usuario/dto/UsuarioUpdateDTO';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    public async getAllUsuarios(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    public async getUsuarioById(id: number): Promise<Usuario> {
        try {
        const result = await this.usuarioRepository.createQueryBuilder('usuario')
            .where('usuario.idUsuario = :id', { id }) // ← nombre correcto de la columna
            .getOne();

        if (!result) {
            throw new Error(`Usuario con id ${id} no encontrado`);
        }

        return result;
        } catch (error: any) {
        throw new Error(error);
        }
    }

    public async create(usuario: Usuario): Promise<Usuario> {
        const result = this.usuarioRepository.create(usuario);
        return await this.usuarioRepository.save(result);
    }

    public async update(id: number, usuario: UsuarioUpdateDTO): Promise<UpdateResult | undefined> {
        const result: UpdateResult = await this.usuarioRepository.update(id, usuario);

        if (result.affected === 0) {
        return undefined;
        }

        return result;
    }

    public async delete(id: number): Promise<boolean> {
        const result = await this.usuarioRepository.delete(id);
        return result.affected !== 0;
    }
}
