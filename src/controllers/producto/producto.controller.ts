import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  NotFoundException,
  Query,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductoService } from 'src/providers/producto/producto.service';
import { ProductoDTO } from './dto/producto.dto';
import { ProductoUpdateDTO } from './dto/ProductoUpdateDTO';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { UpdateResult } from 'typeorm';

@Controller('api/producto')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  // Productos con paginación por tienda
  @Get()
  async getProductos(
    @Query('tiendaId', ParseIntPipe) tiendaId: number,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    if (!tiendaId) {
      throw new BadRequestException('El parámetro tiendaId es requerido.');
    }

    return await this.productoService.findAllPaginated(tiendaId, page, limit);
  }

  // Todos los productos sin paginación
  @Get('all')
  async getAllProductos(): Promise<Producto[]> {
    return await this.productoService.getAllProductos();
  }

  // Obtener producto por ID
  @Get(':id')
  async getProducto(@Param('id', ParseIntPipe) id: number): Promise<Producto> {
    const producto = await this.productoService.getProducto(id);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  // Crear producto
  @Post()
  async postProducto(@Body() request: ProductoDTO) {
    if (!request) {
      throw new BadRequestException('El cuerpo de la solicitud está vacío o es incorrecto');
    }

    const newProducto = await this.productoService.create(request);
    return {
      statusCode: 201,
      message: 'Producto creado correctamente',
      data: newProducto,
    };
  }

  // Actualizar producto
  @Put(':id')
  async putProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: ProductoUpdateDTO,
  ): Promise<UpdateResult> {
    const result = await this.productoService.update(id, request);
    if (!result) {
      throw new NotFoundException(`Producto con id ${id} no encontrado o no modificado`);
    }
    return result;
  }

  // Eliminar producto
  @Delete(':id')
  async deleteProducto(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const result = await this.productoService.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return { message: `Producto con id ${id} eliminado correctamente` };
  }

  // Obtener opciones de personalización de un producto
  @Get(':id/opciones')
  async getOpcionesPersonalizacion(@Param('id', ParseIntPipe) id: number) {
    const producto = await this.productoService.getProductoConOpciones(id);
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto.productoOpciones.map(po => po.opcion);
  }
}
