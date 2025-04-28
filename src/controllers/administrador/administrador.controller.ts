import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { AdministradorService } from 'src/providers/administrador/administrador.service';
import { IPostAdministradorRequest } from './dto/IPostAdministradorRequest';
import { IPostAdministradorResponse } from './dto/IPostAdministradorResponse';
import { AdministradorEntity } from 'src/controllers/database/entities/administrador.entity';
import { IGetAdministradorResponse } from './dto/IGetAdministradorResponse';
import { IPutAdministradorRequest } from './dto/IPutAdministradorRequest';
import { IPutAdministradorResponse } from './dto/IPutAdministradorResponse';

@Controller('administrador')
export class AdministradorController {

    constructor(private administradorService: AdministradorService){}

    @Post()
    async postUser(@Body() request: IPostAdministradorRequest): Promise<IPostAdministradorResponse>{
        console.log('@POST')
        const response: IPostAdministradorResponse = {
            data: null,
            statusCode: 200,
            statusDescription: 'Usuario agregado',
            erros: null
        };

        if(request) {
            const newAdmin: AdministradorEntity = {
                nombre: request.nombre,
                apellido: request.apellido,
                correoElectronico: request.correoElectronico,
                contraseña: request.contraseña,
            } as AdministradorEntity;

            await this.administradorService.create(newAdmin);
            return response;
        }
    }
    
    @Get()
    async getAllAdministradores(): Promise<IGetAdministradorResponse[]> {
        console.log('@GET');
        const administradores = await this.administradorService.getAllUser();
        return administradores.map((admin) => ({
            id: admin.id,
            nombre: admin.nombre,
            apellido: admin.apellido,
            correoElectronico: admin.correoElectronico,
            contraseña: admin.contraseña
        }));
    }

    @Get(':id') // <-- Agregamos esta nueva ruta dinámica
    async getAdministradorById(@Param('id') id: string): Promise<IGetAdministradorResponse> {
        console.log(`@GET id: ${id}`);
        const administrador = await this.administradorService.getUserById(Number(id));
        
        if (!administrador) {
            throw new Error('Administrador no encontrado');
        }

        return {
            id: administrador.id,
            nombre: administrador.nombre,
            apellido: administrador.apellido,
            correoElectronico: administrador.correoElectronico,
            contraseña: administrador.contraseña
        };
    }
    
    @Put(':id')
    async updateAdministrador(
        @Param('id') id: string,
        @Body() updateData: IPutAdministradorRequest
    ): Promise<IPutAdministradorResponse> {
        console.log(`@PUT Update id: ${id}`);
        const administrador = await this.administradorService.updateUser(Number(id), updateData);

        if (!administrador) {
            throw new Error('Administrador no encontrado para actualizar');
        }

        return {
            id: administrador.id,
            nombre: administrador.nombre,
            apellido: administrador.apellido,
            correoElectronico: administrador.correoElectronico,
            contraseña: administrador.contraseña
        };
    }

    @Delete(':id') // <-- Nueva ruta DELETE
    async deleteAdministrador(@Param('id') id: string): Promise<{ message: string }> {
        console.log(`@DELETE id: ${id}`);
        const deleted = await this.administradorService.deleteUser(Number(id));
    
        if (!deleted) {
            throw new Error('Administrador no encontrado para eliminar');
        }
    
        return { message: 'Administrador eliminado exitosamente' };
    }
    
}
