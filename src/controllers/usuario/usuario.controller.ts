import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioService } from 'src/providers/usuario/usuario.service';
import { UsuarioDTO } from './dto/Usuario.dto';
import { UsuarioUpdateDTO } from './dto/UsuarioUpdateDTO';
import { IGetUsuarioResponse } from './dto/IGetUsuarioResponse';
import { IPostUsuarioResponse } from './dto/IPostUsuarioResponse';
import { IPutUsuarioResponse } from './dto/IPutUsuarioResponse';
import { Usuario } from '../database/entities/usuario.entity';
import { UpdateResult } from 'typeorm';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  public async getUsuarios(): Promise<IGetUsuarioResponse[]> {
    const usuarios = await this.usuarioService.getAllUsuarios();

    return usuarios.map((usuario) => ({
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      numeroCelular: usuario.numeroCelular ?? '',
      correoElectronico: usuario.correoElectronico,
      contraseña: usuario.contraseña,
      rol: usuario.rol,
    }));
  }

  @Get(':id')
  public async getUsuario(@Param('id') id: number): Promise<IGetUsuarioResponse> {
    const usuario = await this.usuarioService.getUsuarioById(id);

    if (!usuario) {
      throw new Error(`Usuario con id ${id} no encontrado`);
    }

    return {
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      numeroCelular: usuario.numeroCelular ?? '',
      correoElectronico: usuario.correoElectronico,
      contraseña: usuario.contraseña,
      rol: usuario.rol,
    };
  }

  @Post()
  async postUsuario(@Body() request: UsuarioDTO): Promise<IPostUsuarioResponse> {
    const usuario = new Usuario();
    Object.assign(usuario, request);

    await this.usuarioService.create(usuario);

    return {
      data: null,
      statusCode: 200,
      statusDescription: 'Usuario creado correctamente',
      errors: [],
    };
  }

  @Put(':id')
  async putUsuario(
    @Param('id') id: number,
    @Body() request: UsuarioUpdateDTO,
  ): Promise<IPutUsuarioResponse> {
    const result: UpdateResult | undefined = await this.usuarioService.update(id, request);

    if (!result || result.affected === 0) {
      return {
        data: null,
        statusCode: 404,
        statusDescription: 'Usuario no encontrado',
        errors: ['No se pudo actualizar el usuario'],
      };
    }

    return {
      data: null,
      statusCode: 200,
      statusDescription: 'Usuario actualizado correctamente',
      errors: [],
    };
  }

  @Delete(':id')
  async deleteUsuario(@Param('id') id: number): Promise<any> {
    const isDeleted = await this.usuarioService.delete(id);

    if (!isDeleted) {
      return {
        statusCode: 404,
        statusDescription: 'Usuario no encontrado o no se pudo eliminar',
        errors: [],
      };
    }

    return {
      statusCode: 200,
      statusDescription: 'Usuario eliminado correctamente',
      errors: [],
    };
  }

  // ✅ NUEVO: LOGIN SIMPLE
  @Post('login')
  async login(
    @Body() datos: { correoElectronico: string; contraseña: string },
  ): Promise<Omit<Usuario, 'contraseña'>> {
    const usuario = await this.usuarioService.login(datos.correoElectronico, datos.contraseña);

    if (!usuario) {
      throw new Error('Correo o contraseña incorrectos');
    }

    const { contraseña, ...usuarioSinContraseña } = usuario;
    return usuarioSinContraseña;
  }
}
