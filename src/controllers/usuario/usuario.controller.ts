import {Body,Controller,Delete,Get,Param,Post,Put, UseGuards} from '@nestjs/common';
import { UsuarioService } from 'src/providers/usuario/usuario.service';
import { UsuarioDTO } from './dto/Usuario.dto';
import { UsuarioUpdateDTO } from './dto/UsuarioUpdateDTO';
import { IGetUsuarioResponse } from './dto/IGetUsuarioResponse';
import { IPostUsuarioResponse } from './dto/IPostUsuarioResponse';
import { IPutUsuarioResponse } from './dto/IPutUsuarioResponse';
import { Usuario } from '../database/entities/usuario.entity';
import { UpdateResult } from 'typeorm';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBody, } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [Usuario] })
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
      disponibilidad: usuario.disponibilidad
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: Usuario })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
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
      disponibilidad: usuario.disponibilidad
    };
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: UsuarioDTO })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
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
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UsuarioUpdateDTO })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente'})
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async putUsuario(@Param('id') id: number, @Body() request: UsuarioUpdateDTO): Promise<IPutUsuarioResponse> {
    const result: UpdateResult | undefined = await this.usuarioService.update(id, request);
    if (!result) {
      throw new Error(`No se encontró usuario con id ${id} para actualizar`);
    }

    return {
      data: null,
      statusCode: 200,
      statusDescription: 'Usuario actualizado correctamente',
      errors: [],
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  async deleteUsuario(@Param('id') id: number): Promise<boolean> {
    return this.usuarioService.delete(id);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión con correo y contraseña' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        correoElectronico: { type: 'string', example: 'correo@ejemplo.com' },
        contraseña: { type: 'string', example: '123456' },
      },
      required: ['correoElectronico', 'contraseña'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario autenticado (sin contraseña)',
    type: Usuario,
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(
    @Body() datos: { correoElectronico: string; contraseña: string }
  ): Promise<Omit<Usuario, 'contraseña'>> {
    const usuario = await this.usuarioService.login(datos.correoElectronico, datos.contraseña);
    if (!usuario) {
      throw new Error('Correo o contraseña incorrectos');
    }

    const { contraseña, ...usuarioSinContraseña } = usuario;
    return usuarioSinContraseña;
  }

  @Get('baristas-disponibles/:idTienda')
  @ApiOperation({ summary: 'Obtener baristas disponibles por tienda' })
  @ApiParam({ name: 'idTienda', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de baristas disponibles', type: [Usuario] })
  async getBaristasDisponibles(
    @Param('idTienda') idTienda: number
  ): Promise<Usuario[]> {
    return await this.usuarioService.getBaristasDisponiblesPorTienda(idTienda);
  }



}
