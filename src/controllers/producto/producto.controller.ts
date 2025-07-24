import { Body, Controller, Get, Param, Post, Put, Delete, NotFoundException, Query, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from 'src/providers/producto/producto.service';
import { ProductoDTO } from './dto/producto.dto';
import { ProductoUpdateDTO } from './dto/ProductoUpdateDTO';
import { Producto } from '../database/entities/producto.entity';

@Controller('api/producto')
export class ProductoController {
    constructor(private productoService: ProductoService) {}

   
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

    
    @Get(':id')
    async getProducto(@Param('id', ParseIntPipe) id: number) {
        const producto = await this.productoService.getProducto(id);
        if (!producto) {
            throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return producto;
    }

    @Get('all')
    async getAllProductos(): Promise<Producto[]> {
        return await this.productoService.getAllProductos();
    }


    
    @Post()
    async postProducto(@Body() request: ProductoDTO) {
        return await this.productoService.create(request);
    }

    @Put(':id')
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
    async deleteProducto(@Param('id', ParseIntPipe) id: number) {
        const result = await this.productoService.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return { message: `Producto con id ${id} eliminado correctamente` };
    }
}
