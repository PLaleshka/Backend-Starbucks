import { Body, Controller, Get, Param, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProductoService } from 'src/providers/producto/producto.service';
import { ProductoDTO } from './dto/producto.dto';
import { ProductoUpdateDTO } from './dto/ProductoUpdateDTO';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { UpdateResult } from 'typeorm';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [Producto] })
  async getProductos(): Promise<Producto[]> {
    return await this.productoService.getAllProductos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Producto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async getProducto(@Param('id') id: number): Promise<Producto> {
    const producto = await this.productoService.getProducto(id);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: ProductoDTO })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  async postProducto(@Body() request: ProductoDTO) {
    if (request) {
      const newProducto = await this.productoService.create(request);
      return {
        statusCode: 201,
        message: 'Producto creado correctamente',
        data: newProducto,
      };
    }
    return {
      statusCode: 400,
      message: 'Solicitud inválida',
      errors: ['El cuerpo de la solicitud está vacío o es incorrecto'],
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: ProductoUpdateDTO })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado o no modificado' })
  async putProducto(
    @Param('id') id: number,
    @Body() request: ProductoUpdateDTO,
  ): Promise<UpdateResult> {
    const result = await this.productoService.update(id, request);

    if (!result) {
      throw new NotFoundException(`Producto con id ${id} no encontrado o no modificado`);
    }

    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async deleteProducto(@Param('id') id: number): Promise<{ message: string }> {
    const result = await this.productoService.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return { message: `Producto con id ${id} eliminado correctamente` };
  }
}
