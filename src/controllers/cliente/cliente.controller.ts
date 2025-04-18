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

    constructor(private clienteService: ClienteService) {}

    @Get()
    public getClientes(): IGetClienteResponse[] {
        return this.clientes;
    }

    @Get(':id')
    public getCliente(@Param('id') id: number): IGetClienteResponse {
        const cliente = this.clientes.find(
            c => c.idCliente === Number(id)
        );
        if (!cliente) {
            throw new Error(`Cliente con id ${Number(id)} no encontrado`);
        }
        return cliente;
    }

    @Post()
    async postCliente(
        @Body() request: ClienteDTO
    ): Promise<IPostClienteResponse> {
        const response: IPostClienteResponse = {
            data: null,
            statusCode: 200, 
            statusDescription: 'Cliente creado correctamente',
            errors: null,
        };

        if (request) {
            const newCliente: Cliente = new Cliente()
            Object.assign(newCliente, request);

            await this.clienteService.create(newCliente);
            
            return response;
        } 
        else {
            response.statusCode = 400;
            response.statusDescription = 'Solicitud inválida';
            response.errors = ['El cuerpo de la solicitud está vacío o es incorrecto'];
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

        let isClienteFound: boolean = false;

        this.clientes.filter(
            (cliente) => {
                if (cliente.idCliente == id) {
                    this.clientes.splice(cliente.idCliente, 1)
                    isClienteFound = true;
                }
            }
        );

        if (!isClienteFound) 
            return response.status(404).send();

        return response.status(200).send();
    }
}