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
import { InventarioService } from 'src/providers/inventario/inventario.service';
import { IPostInventarioRequest } from './dto/IPostInventarioRequest';
import { IPostInventarioResponse } from './dto/IPostInventarioResponse';
import { Inventario } from 'src/controllers/database/entities/inventario.entity';
import { IPutInventarioRequest } from './dto/IPutInventarioRequest';
import { UpdateResult } from 'typeorm';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Inventario')
@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todo el inventario' })
  @ApiResponse({
    status: 200,
    description: 'Lista completa del inventario',
    type: [Inventario],
  })
  async getAll(): Promise<Inventario[]> {
    return await this.inventarioService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro en el inventario' })
  @ApiBody({ type: IPostInventarioRequest })
  @ApiResponse({
    status: 201,
    description: 'Inventario creado correctamente',
    type: Inventario,
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear inventario',
  })
  async create(
    @Body() request: IPostInventarioRequest,
  ): Promise<IPostInventarioResponse> {
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
  @ApiOperation({ summary: 'Actualizar un registro del inventario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IPutInventarioRequest })
  @ApiResponse({
    status: 200,
    description: 'Inventario actualizado correctamente',
    type: UpdateResult,
  })
  async update(
    @Param('id') id: number,
    @Body() body: IPutInventarioRequest,
  ): Promise<UpdateResult> {
    return await this.inventarioService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro del inventario por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Inventario eliminado correctamente',
  })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.inventarioService.delete(id);
    return { message: `Inventario con id ${id} eliminado correctamente` };
  }
}
