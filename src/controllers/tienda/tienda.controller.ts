import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TiendaService } from 'src/providers/tienda/tienda.service';
import { IPostTiendaRequest } from './dto/IPostTiendaRequest';
import { IPostTiendaResponse } from './dto/IPostTiendaResponse';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';
import { IGetTiendaResponse } from './dto/IGetTiendaResponse';
import { IPutTiendaRequest } from './dto/IPutTiendaRequest';
import { IPutTiendaResponse } from './dto/IPutTiendaResponse';
import { Usuario } from '../database/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('tienda')
export class TiendaController {
  constructor(
    private tiendaService: TiendaService,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  @Post()
  async postUser(@Body() request: IPostTiendaRequest): Promise<IPostTiendaResponse> {
    let administrador: Usuario | null = null;

    if (request.idAdministrador !== null) {
      administrador = await this.usuarioRepository.findOneBy({ idUsuario: request.idAdministrador });

      if (!administrador || administrador.rol !== 'administrador') {
        throw new Error('Administrador no encontrado o rol incorrecto');
      }
    }

    const newTienda: TiendaEntity = {
      nombreTienda: request.nombreTienda,
      horario: request.horario,
      ubicacion: request.ubicacion,
      capacidad: request.capacidad,
      disponibilidad: request.disponibilidad,
      correoElectronico: request.correoElectronico,
      contraseña: request.contraseña,
      administrador: administrador,
    } as TiendaEntity;

    await this.tiendaService.create(newTienda);

    return {
      data: null,
      statusCode: 200,
      statusDescription: 'Tienda agregada',
      erros: '',
    };
  }

  @Get()
  async getAllTiendas(): Promise<IGetTiendaResponse[]> {
    const tiendas: TiendaEntity[] = await this.tiendaService.getAllTiendas();

    const response: IGetTiendaResponse[] = tiendas.map(tienda => ({
      idTienda: tienda.idTienda,
      nombreTienda: tienda.nombreTienda,
      horario: tienda.horario,
      ubicacion: tienda.ubicacion,
      capacidad: tienda.capacidad,
      disponibilidad: tienda.disponibilidad,
      correoElectronico: tienda.correoElectronico,
      contraseña: tienda.contraseña,
      administrador: tienda.administrador ? {
        idAdministrador: tienda.administrador.idUsuario,
        nombre: tienda.administrador.nombre,
        apellido: tienda.administrador.apellido,
        correoElectronico: tienda.administrador.correoElectronico,
      } : null,
    }));

    return response;
  }

  @Put(':id')
  async putTienda(
    @Param('id') id: number,
    @Body() request: IPutTiendaRequest
  ): Promise<IPutTiendaResponse> {
    const tienda = await this.tiendaService.updateTienda(id, request);

    if (!tienda) {
      return {
        data: null,
        statusCode: 404,
        statusDescription: 'Tienda no encontrada',
        errors: null,
      };
    }

    const response: IPutTiendaResponse = {
      data: {
        idTienda: tienda.idTienda,
        nombreTienda: tienda.nombreTienda,
        horario: tienda.horario,
        ubicacion: tienda.ubicacion,
        capacidad: tienda.capacidad,
        disponibilidad: tienda.disponibilidad,
        correoElectronico: tienda.correoElectronico,
        contraseña: tienda.contraseña,
        administrador: tienda.administrador
          ? {
              idAdministrador: tienda.administrador.idUsuario,
              nombre: tienda.administrador.nombre,
              apellido: tienda.administrador.apellido,
              correoElectronico: tienda.administrador.correoElectronico,
            }
          : null,
      },
      statusCode: 200,
      statusDescription: 'Tienda actualizada correctamente',
      errors: null,
    };

    return response;
  }

  @Delete(':id')
  async deleteTienda(@Param('id') id: number): Promise<any> {
    const isDeleted = await this.tiendaService.delete(id);

    if (!isDeleted) {
      return {
        statusCode: 404,
        statusDescription: 'Tienda no encontrada o no se pudo eliminar',
        errors: null,
      };
    }

    return {
      statusCode: 200,
      statusDescription: 'Tienda eliminada correctamente',
      errors: null,
    };
  }
}
