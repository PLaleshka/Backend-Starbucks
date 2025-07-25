import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';
import { UsuarioUpdateDTO } from 'src/controllers/usuario/dto/UsuarioUpdateDTO';
import * as bcrypt from 'bcrypt';

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
        .where('usuario.idUsuario = :id', { id }) // Asegúrate que la columna es 'idUsuario'
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
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(usuario.contraseña, 10);
    const nuevoUsuario = this.usuarioRepository.create({
      ...usuario,
      contraseña: hashedPassword
    });

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  public async update(id: number, usuario: UsuarioUpdateDTO): Promise<UpdateResult | undefined> {
    const result: UpdateResult = await this.usuarioRepository.update(id, usuario);
    return result.affected === 0 ? undefined : result;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.usuarioRepository.delete(id);
    return result.affected !== 0;
  }

  public async login(correoElectronico: string, contrasena: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { correoElectronico } });

    if (!usuario) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(contrasena, usuario.contraseña);
    if (!passwordMatch) {
      return null;
    }

    return usuario;
  }
}
