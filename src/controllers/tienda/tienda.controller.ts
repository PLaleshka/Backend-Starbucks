import {Body,Controller,Delete,Get,Param,Post,Put,UseGuards} from '@nestjs/common';
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
import {ApiTags,ApiOperation,ApiResponse,ApiBody,ApiParam,ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/controllers/auth/jwt-auth.guard';

@ApiTags('Tienda')
@ApiBearerAuth() // Swagger muestra que requiere JWT
@UseGuards(JwtAuthGuard) // Todas las rutas protegidas
@Controller('tienda')
export class TiendaController {
  usuarioService: any;
  constructor(
    private tiendaService: TiendaService,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva tienda' })
  @ApiBody({ type: IPostTiendaRequest })
  @ApiResponse({ status: 200, description: 'Tienda agregada correctamente' })
  async postUser(@Body() request: IPostTiendaRequest): Promise<IPostTiendaResponse> {
    let administrador: Usuario | null = null;

    if (request.idAdministrador !== null) {
      administrador = await this.usuarioRepository.findOneBy({
        idUsuario: request.idAdministrador,
      });

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
  @ApiOperation({ summary: 'Obtener todas las tiendas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tiendas',
    type: [TiendaEntity],
  })
  async getAllTiendas(): Promise<IGetTiendaResponse[]> {
    const tiendas: TiendaEntity[] = await this.tiendaService.getAllTiendas();

    return tiendas.map(tienda => ({
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
    }));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tienda por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: require('./dto/IPutTiendaRequest').PutTiendaRequest })
  @ApiResponse({ status: 200, description: 'Tienda actualizada correctamente' })
  async putTienda(
    @Param('id') id: number,
    @Body() request: IPutTiendaRequest,
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

    return {
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
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tienda por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tienda eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Tienda no encontrada' })
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
