import { Body, Controller, Get, Param, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { BaristaService } from 'src/providers/barista/barista.service';
import { BaristaDTO } from './dto/BaristaDTO';
import { Barista } from 'src/controllers/database/entities/barista.entity';
import { BaristaUpdateDTO } from './dto/BaristaUpdateDTO';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('barista')
export class BaristaController {
    constructor(private readonly baristaService: BaristaService) {}

    @Get()
    async getBaristas(): Promise<Barista[]> {
        return await this.baristaService.getAllBaristas();
    }

    @Get(':id')
    async getBarista(@Param('id') id: number): Promise<Barista> {
        const barista = await this.baristaService.getBarista(id);
        if (!barista) {
            throw new NotFoundException(`Barista con id ${id} no encontrado`);
        }
        return barista;
    }

    @Post()
async postBarista(@Body() request: BaristaDTO) {
    if (request) {
        const baristaEntity = new Barista();
        Object.assign(baristaEntity, request);
        const newBarista = await this.baristaService.create(baristaEntity);
        return {
            statusCode: 201,
            message: 'Barista creado correctamente',
            data: newBarista
        };
    }
    return {
        statusCode: 400,
        message: 'Solicitud inválida',
        errors: ['El cuerpo de la solicitud está vacío o es incorrecto']
    };
}


    @Put(':id')
    async putBarista(
        @Param('id') id: number,
        @Body() request: BaristaUpdateDTO,
    ): Promise<UpdateResult> {
        const result = await this.baristaService.update(id, request);

        if (!result) {
            throw new NotFoundException(`Barista con id ${id} no encontrado o no modificado`);
        }

        return result;
    }

    @Delete(':id')
    async deleteBarista(@Param('id') id: number): Promise<{ message: string }> {
        const result = await this.baristaService.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Barista con id ${id} no encontrado`);
        }

        return { message: `Barista con id ${id} eliminado correctamente` };
    }
}
