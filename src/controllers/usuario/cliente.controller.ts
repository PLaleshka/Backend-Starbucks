import { Body, Controller, Get, Param, Post, Put, Res, Delete } from '@nestjs/common';
import { IPostUsuarioResponse } from './dto/IPostUsuarioResponse';
import { IGetUsuarioResponse } from './dto/IGetUsuarioResponse';
import { Response } from 'express';
import { ClienteService } from 'src/providers/cliente/cliente.service';
import { UsuarioUpdateDTO } from './dto/UsuarioUpdateDTO';
import { UpdateResult } from 'typeorm';
import { UsuarioDTO } from './dto/usuario.dto';
import { Usuario } from '../database/entities/usuario.entity';


@Controller('cliente')
export class ClienteController {
    private clientes: IGetUsuarioResponse[] = [
        {
            idCliente: 1,
            nombre: 'Juan',
            apellido: 'Pérez',
            numeroCelular: '+56 9 82412276',
            correoElectronico: 'juan@hotmail.cl',
            contraseña: '123456',
        },
        {
            idCliente: 2,
            nombre: 'Juana',
            apellido: 'Pereira',
            numeroCelular: '+56 9 82412277',
            correoElectronico: 'juana@hotmail.cl',
            contraseña: '1234567',
        }
    ];

    constructor(private clienteService: ClienteService) {}

    @Get()
    public async getClientes(): Promise<IGetUsuarioResponse[]> {
        // Usar el servicio para obtener los clientes desde la base de datos
        const clientes = await this.clienteService.getAllClientes();

        return clientes.map(cliente => ({
            idCliente: cliente.idCliente,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            numeroCelular: cliente.numeroCelular,
            correoElectronico: cliente.correoElectronico,
            contraseña: cliente.contraseña,
        }));
    }
    


    @Get(':id')
    public getCliente(@Param('id') id: number): IGetUsuarioResponse {
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
        @Body() request: UsuarioDTO
    ): Promise<IPostUsuarioResponse> {
        const response: IPostUsuarioResponse = {
            data: null,
            statusCode: 200, 
            statusDescription: 'Cliente creado correctamente',
            errors: null,
        };

        if (request) {
            const newCliente: Usuario = new Usuario()
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
        @Body() request: UsuarioUpdateDTO
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