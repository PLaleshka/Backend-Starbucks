import { Body, Controller, Get, Param, Post, Put, Res, Delete } from '@nestjs/common';
import { IPostClienteRequest } from './dto/IPostClienteRequest';
import { IPostClienteResponse } from './dto/IPostClienteResponse';
import { IGetClienteResponse } from './dto/IGetClienteResponse';
import { Response } from 'express';
import { ClienteService } from 'src/providers/cliente/cliente.service';
import { ClienteDTO } from './dto/cliente.dto';
import { Cliente } from 'src/controllers/database/entities/cliente.entity.ts';
import { ClienteUpdateDTO } from './dto/ClienteUpdateDTO';
import { UpdateResult } from 'typeorm';



@Controller('cliente')
export class ClienteController {
    private clientes: IGetClienteResponse[] = [
        {
            idCliente: 1,
            nombre: 'Juan',
            apellido: 'Pérez',
            correoElectronico: 'juan@hotmail.cl',
            contraseña: '123456',
        },
        {
            idCliente: 2,
            nombre: 'Juana',
            apellido: 'Pereira',
            correoElectronico: 'juana@hotmail.cl',
            contraseña: '1234567',
        }
    ];

    constructor(private readonly clienteService: ClienteService) {}

    @Get()
    public getClientes(): IGetClienteResponse[] {
        return this.clientes;
    }

    @Get(':id')
    public async getCliente(@Param('id') id: number): Promise<IGetClienteResponse> {
        return await this.clienteService.getCliente(id);
    }

    @Post()
    async postCliente(@Body() request: ClienteDTO): Promise<IPostClienteResponse> {
        const response: IPostClienteResponse = {
            data: null,
            statusCode: 200,
            statusDescription: 'Cliente creado correctamente',
            errors: null,
        };

        try {
            const clienteCreado = await this.clienteService.create(request);
        } catch (error) {
            response.statusCode = 500;
            response.statusDescription = 'Error al crear el cliente';
            response.errors = [error instanceof Error ? error.message : 'Error desconocido'];
        }

        return response;
    }

    @Put(':id')
    async putCliente(
        @Param('id') id: number,
        @Body() request: ClienteUpdateDTO
    ): Promise<UpdateResult | undefined> {

        return await this.clienteService.update(id, request);

    }

    @Delete(':id')
    async deleteCliente(@Param('id') id: number, @Res() response: Response): Promise<Response> {
        if (isNaN(id)) return response.status(400).send();

        const result = await this.clienteService.delete(Number(id)); 

        if (!result) {
            return response.status(404).send({ message: 'Cliente no encontrado' });
        }

        return response.status(200).send({ message: 'Cliente eliminado correctamente' });
    }
}