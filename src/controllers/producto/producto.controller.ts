import {Body,Controller,Get,Param,Post,Put,Delete,NotFoundException,Query,BadRequestException,ParseIntPipe} from '@nestjs/common';
import { ProductoService } from 'src/providers/producto/producto.service';
import { ProductoDTO } from './dto/producto.dto';
import { ProductoUpdateDTO } from './dto/ProductoUpdateDTO';
import { Producto } from '../database/entities/producto.entity';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiQuery,ApiBody} from '@nestjs/swagger';

@ApiTags('Producto')
@Controller('api/producto')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener productos paginados por tienda' })
  @ApiQuery({ name: 'tiendaId', type: Number, required: true, description: 'ID de la tienda' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Número de página' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Cantidad por página' })
  @ApiResponse({ status: 200, description: 'Lista paginada de productos' })
  @ApiResponse({ status: 400, description: 'Parámetro tiendaId requerido' })
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

  @Get(':id')
  @ApiOperation({ summary: 'Obtener producto por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Producto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async getProducto(@Param('id', ParseIntPipe) id: number) {
    const producto = await this.productoService.getProducto(id);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  @Get('all')
  @ApiOperation({ summary: 'Obtener todos los productos (sin paginación)' })
  @ApiResponse({ status: 200, description: 'Lista de todos los productos', type: [Producto] })
  async getAllProductos(): Promise<Producto[]> {
    return await this.productoService.getAllProductos();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: ProductoDTO })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente', type: Producto })
  async postProducto(@Body() request: ProductoDTO) {
    return await this.productoService.create(request);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: ProductoUpdateDTO })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado o no modificado' })
  async putProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: ProductoUpdateDTO,
  ) {
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
  async deleteProducto(@Param('id', ParseIntPipe) id: number) {
    const result = await this.productoService.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return { message: `Producto con id ${id} eliminado correctamente` };
  }

    @Get(':id/opciones')
    async getOpcionesPersonalizacion(@Param('id') id: number) {
    const producto = await this.productoService.getProductoConOpciones(id);
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto.productoOpciones.map(po => po.opcion);
    }
}

