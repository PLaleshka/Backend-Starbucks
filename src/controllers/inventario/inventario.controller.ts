import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InventarioService } from 'src/providers/inventario/inventario.service';
import { IPostInventarioRequest } from './dto/IPostInventarioRequest';
import { IPostInventarioResponse } from './dto/IPostInventarioResponse';
import { Inventario } from 'src/controllers/database/entities/inventario.entity';
import { IPutInventarioRequest } from './dto/IPutInventarioRequest';
import { UpdateResult } from 'typeorm';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get()
  async getAll(): Promise<Inventario[]> {
    return await this.inventarioService.getAll();
  }

  @Post()
  async create(@Body() request: IPostInventarioRequest): Promise<IPostInventarioResponse> {
    const response: IPostInventarioResponse = {
      data: null,
      statusCode: 201,
      statusDescription: 'Inventario creado correctamente',
      errors: null,
    };

    try {
      const result = await this.inventarioService.create(request);
      response.data = result;
    } catch (error: any) {
      response.statusCode = 400;
      response.statusDescription = 'Error al crear inventario';
      response.errors = [error.message];
    }

    return response;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: IPutInventarioRequest): Promise<UpdateResult> {
    return await this.inventarioService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.inventarioService.delete(id);
    return { message: `Inventario con id ${id} eliminado correctamente` };
  }
}
