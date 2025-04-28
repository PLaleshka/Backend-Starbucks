import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TiendaService } from 'src/providers/tienda/tienda.service';
import { IPostTiendaRequest } from './dto/IPostTiendaRequest';
import { IPostTiendaResponse } from './dto/IPostTiendaResponse';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';
import { IGetTiendaResponse } from './dto/IGetTiendaResponse';
import { AdministradorService } from 'src/providers/administrador/administrador.service'; 
import { IPutTiendaRequest } from './dto/IPutTiendaRequest';
import { IPutTiendaResponse } from './dto/IPutTiendaResponse';
import { AdministradorEntity } from '../database/entities/administrador.entity';

@Controller('tienda')
export class TiendaController {
    
    constructor(
        private tiendaService: TiendaService,  
        private administradorService: AdministradorService  
    ) {}

    @Post()
    async postUser(@Body() request: IPostTiendaRequest): Promise<IPostTiendaResponse> {
        console.log('@POST');
    
        let administrador: AdministradorEntity | null = null; // <- Cambio aquí
    
        if (request.idAdministrador !== null) {
            administrador = await this.administradorService.getUserById(request.idAdministrador);
    
            if (!administrador) {
                throw new Error('Administrador no encontrado');
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
                idAdministrador: tienda.administrador.id,
                nombre: tienda.administrador.nombre,
                apellido: tienda.administrador.apellido,
                correoElectronico: tienda.administrador.correoElectronico,
            } : null,  // Verifica si hay administrador, si no, asigna null
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
                errors: null
            };
        }

        // Aquí puedes devolver la tienda actualizada como parte de la respuesta
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
                          idAdministrador: tienda.administrador.id,
                          nombre: tienda.administrador.nombre,
                          apellido: tienda.administrador.apellido,
                          correoElectronico: tienda.administrador.correoElectronico
                      }
                    : null
            },
            statusCode: 200,
            statusDescription: 'Tienda actualizada correctamente',
            errors: null
        };

        return response;
    }

    @Delete(':id')  // Se utiliza el id de la tienda en la URL
    async deleteTienda(@Param('id') id: number): Promise<any> {
        const isDeleted = await this.tiendaService.delete(id);

        if (!isDeleted) {
            return {
                statusCode: 404,
                statusDescription: 'Tienda no encontrada o no se pudo eliminar',
                errors: null
            };
        }

        return {
            statusCode: 200,
            statusDescription: 'Tienda eliminada correctamente',
            errors: null
        };
    }
}
