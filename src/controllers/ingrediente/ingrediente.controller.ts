import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { IngredienteService } from 'src/providers/ingrediente/ingrediente.service';
import { Ingrediente } from 'src/controllers/database/entities/ingrediente.entity';
import { IPostIngredienteRequest } from './dto/IPostIngredienteRequest';
import { IPostIngredienteResponse } from './dto/IPostIngredienteResponse';
import { IPutIngredienteRequest } from './dto/IputIngredienteRequest';
import { IPutIngredienteResponse } from './dto/IPutIngredienteResponse';

@Controller('ingrediente')
export class IngredienteController {
  constructor(private readonly ingredienteService: IngredienteService) {}

  @Get()
  async getAll(): Promise<Ingrediente[]> {
    return await this.ingredienteService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Ingrediente> {
    return await this.ingredienteService.getById(id);
  }

  @Post()
  async create(
    @Body() request: IPostIngredienteRequest,
  ): Promise<IPostIngredienteResponse> {
    const nuevo = await this.ingredienteService.create(request);
    return {
      data: nuevo,
      statusCode: 201,
      statusDescription: 'Ingrediente creado correctamente',
      errores: null,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() request: IPutIngredienteRequest,
  ): Promise<IPutIngredienteResponse> {
    const result = await this.ingredienteService.update(id, request);
    if (!result.affected) {
      throw new NotFoundException('Ingrediente no encontrado');
    }
    return {
      affected: result.affected,
      message: 'Ingrediente actualizado correctamente',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    const result = await this.ingredienteService.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Ingrediente no encontrado');
    }
    return { message: 'Ingrediente eliminado correctamente' };
  }
}
