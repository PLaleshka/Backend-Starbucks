import { Body, Controller, Post } from '@nestjs/common';
import { ProductoService } from 'src/providers/producto/producto.service';
import { IPostProductoRequest } from './dto/IPostProductoRequest';
import { IPostProductoResponse } from './dto/IpostProductoResponse';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { Get } from '@nestjs/common';

@Controller('producto')
export class ProductoController {

  constructor(private productoService: ProductoService) {}

  @Post()
  async postProducto(@Body() request: IPostProductoRequest): Promise<IPostProductoResponse> {
    console.log('@POST producto');
    
    const response: IPostProductoResponse = {
      data: null,
      statusCode: 200,
      statusDescription: 'Producto agregado',
      errores: null,
    };

    if (request) {
      const nuevoProducto: Producto = {
        nombre: request.nombre,
        tipo: request.tipo,
        descripcion: request.descripcion,
        tiempo_estimado: request.tiempo_estimado,
      } as unknown as Producto;

      const productoCreado = await this.productoService.create(nuevoProducto);
      response.data = productoCreado;
    }

    return response;
  }

  @Get()
async getProductos(): Promise<Producto[]> {
  return await this.productoService.findAll();
}
}
