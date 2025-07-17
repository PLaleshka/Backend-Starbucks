import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StockService } from 'src/providers/stock/stock.service';
import { IPostStockRequest } from './dto/IPostStockRequest';
import { IPostStockResponse } from './dto/IPostStockResponse';
import { Stock } from 'src/controllers/database/entities/stock.entity';
import { IPutStockRequest } from './dto/IPutStockRequest';
import { UpdateResult } from 'typeorm';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de stock' })
  @ApiResponse({ status: 200, description: 'Lista de stock', type: [Stock] })
  async getAll(): Promise<Stock[]> {
    return await this.stockService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar nuevo stock' })
  @ApiBody({ type: IPostStockRequest })
  @ApiResponse({ status: 201, description: 'Stock registrado correctamente' })
  @ApiResponse({ status: 400, description: 'Error al registrar stock' })
  async create(@Body() request: IPostStockRequest): Promise<IPostStockResponse> {
    const response: IPostStockResponse = {
      data: null,
      statusCode: 201,
      statusDescription: 'Stock registrado correctamente',
      errores: null,
    };

    try {
      const result = await this.stockService.create(request);
      response.data = result;
    } catch (error: any) {
      response.statusCode = 400;
      response.statusDescription = 'Error al registrar stock';
      response.errores = [error.message];
    }

    return response;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar stock por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: IPutStockRequest })
  @ApiResponse({ status: 200, description: 'Stock actualizado correctamente' })
  async update(@Param('id') id: number, @Body() body: IPutStockRequest): Promise<UpdateResult> {
    return await this.stockService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar stock por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Stock eliminado correctamente' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.stockService.delete(id);
    return { message: `Stock con id ${id} eliminado correctamente` };
  }
}
