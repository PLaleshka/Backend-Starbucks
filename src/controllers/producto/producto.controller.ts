import { Body, Controller, Get, Param, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProductoService } from 'src/providers/producto/producto.service';
import { ProductoDTO } from './dto/producto.dto';
import { ProductoUpdateDTO } from './dto/ProductoUpdateDTO';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('producto')
export class ProductoController {
    constructor(private productoService: ProductoService) {}

    @Get()
    async getProductos(): Promise<Producto[]> {
        return await this.productoService.getAllProductos();
    }

    @Get(':id')
    async getProducto(@Param('id') id: number): Promise<Producto> {
        const producto = await this.productoService.getProducto(id);
        if (!producto) {
            throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return producto;
    }

    @Post()
    async postProducto(@Body() request: ProductoDTO) {
        if (request) {
            const newProducto = await this.productoService.create(request);
            return {
                statusCode: 201,
                message: 'Producto creado correctamente',
                data: newProducto
            };
        }
        return {
            statusCode: 400,
            message: 'Solicitud inválida',
            errors: ['El cuerpo de la solicitud está vacío o es incorrecto']
        };
    }

    @Put(':id')
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
    async deleteProducto(@Param('id') id: number): Promise<{ message: string }> {
        const result = await this.productoService.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }

        return { message: `Producto con id ${id} eliminado correctamente` };
    }
}
