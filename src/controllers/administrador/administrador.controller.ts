import { Body, Controller, Post } from '@nestjs/common';
import { AdministradorService } from 'src/providers/administrador/administrador.service';
import { IPostAdministradorRequest } from './dto/IPostAdministradorRequest';
import { IPostAdministradorResponse } from './dto/IPostAdministradorResponse';
import { Administrador } from 'src/controllers/database/entities/administrador.entity';

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
                errors: null,
            };
    
            if(request) {
                const newAdmin: Administrador = {
                    nombre: request.nombre,
                    apellido: request.apellido,
                    correoElectronico: request.correoElectronico,
                    contraseña: request.contraseña,
                } as Administrador;
    
                await this.administradorService.create(newAdmin);
                return response;
            }
            return response;
        }
}
