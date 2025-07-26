import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';
import { UsuarioUpdateDTO } from 'src/controllers/usuario/dto/UsuarioUpdateDTO';
import * as bcrypt from 'bcrypt';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(TiendaEntity)
    private readonly tiendaRepository: Repository<TiendaEntity>
  ) {}

  public async getAllUsuarios(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  public async getUsuarioById(id: number): Promise<Usuario> {
    try {
      const result = await this.usuarioRepository.createQueryBuilder('usuario')
        .where('usuario.idusuario = :id', { id })
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
    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(usuario.contraseña, 10);
    const nuevoUsuario = this.usuarioRepository.create({
      ...usuario,
      contraseña: hashedPassword
    });

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  public async update(id: number, dto: UsuarioUpdateDTO): Promise<UpdateResult | undefined> {
    const updateData: Partial<Usuario> = { ...dto };

    // Si se va a asignar una tienda
    if (dto.idTienda) {
      const tienda = await this.tiendaRepository.findOneBy({ idTienda: dto.idTienda });
      if (!tienda) throw new Error('Tienda no encontrada');
      updateData.tiendaTrabajo = tienda;
    }

    const result = await this.usuarioRepository.update(id, updateData);
    if (result.affected === 0) {
      return undefined;
    }

    return result;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.usuarioRepository.delete(id);
    return result.affected !== 0;
  }

  // Método seguro para login con bcrypt
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

  // src/providers/usuario/usuario.service.ts

  public async getBaristasDisponiblesPorTienda(idTienda: number): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      where: {
        rol: 'barista',
        disponibilidad: 'disponible',
        tiendaTrabajo: { idTienda }
      },
      relations: ['tiendaTrabajo']
    });
  }


}
