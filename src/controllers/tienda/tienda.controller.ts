import { Body, Controller, Post } from '@nestjs/common';
import { TiendaService } from 'src/providers/tienda/tienda.service';
import { IPostTiendaRequest } from './dto/IPostTiendaRequest';
import { IPostTiendaResponse } from './dto/IPostTiendaResponse';
import { Tienda } from 'src/controllers/database/entities/tienda.entity';

@Controller('tienda')
export class TiendaController {
    
    constructor(private tiendaService: TiendaService){}
    
    @Post()
        async postUser(@Body() request: IPostTiendaRequest): Promise<IPostTiendaResponse>{
            console.log('@POST')
            const response: IPostTiendaResponse = {
                data: null,
                statusCode: 200,
                statusDescription: 'Usuario agregado',
                errors: null
            };
    
            if(request) {
                const newTienda: Tienda = {
                    nombreTienda: request.nombreTienda,
                    horario: request.horario,
                    ubicacion: request.ubicacion,
                    capacidad: request.capacidad,
                    disponibilidad: request.disponibilidad,
                    correoElectronico: request.correoElectronico,
                    contraseña: request.contraseña,
                } as unknown as Tienda;
    
                await this.tiendaService.create(newTienda);
                return response;
            }
            return response;
        }
}
