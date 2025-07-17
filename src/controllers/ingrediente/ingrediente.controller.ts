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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Ingrediente')
@Controller('ingrediente')
export class IngredienteController {
  constructor(private readonly ingredienteService: IngredienteService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los ingredientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista completa de ingredientes',
    type: [Ingrediente],
  })
  async getAll(): Promise<Ingrediente[]> {
    return await this.ingredienteService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ingrediente por su ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Ingrediente encontrado',
    type: Ingrediente,
  })
  @ApiResponse({ status: 404, description: 'Ingrediente no encontrado' })
  async getById(@Param('id') id: number): Promise<Ingrediente> {
    return await this.ingredienteService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo ingrediente' })
  @ApiBody({ type: IPostIngredienteRequest })
  @ApiResponse({
    status: 201,
    description: 'Ingrediente creado correctamente',
    type: Ingrediente, // Replace with a class, e.g., Ingrediente or a DTO class
  })
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
  @ApiOperation({ summary: 'Actualizar un ingrediente por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IPutIngredienteRequest })
  @ApiResponse({
    status: 200,
    description: 'Ingrediente actualizado correctamente',
    type: Object,
  })
  @ApiResponse({ status: 404, description: 'Ingrediente no encontrado' })
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
  @ApiOperation({ summary: 'Eliminar un ingrediente por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Ingrediente eliminado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Ingrediente no encontrado' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    const result = await this.ingredienteService.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Ingrediente no encontrado');
    }
    return { message: 'Ingrediente eliminado correctamente' };
  }
}
