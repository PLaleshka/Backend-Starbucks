import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { ProductoOpcionService } from 'src/providers/producto-opcion/producto-opcion.service';
import { IPostProductoOpcionRequest } from './dto/IPostProductoOpcionRequest.dot';

@Controller('producto-opcion')
export class ProductoOpcionController {
  constructor(private readonly productoOpcionService: ProductoOpcionService) {}

  @Post()
  crear(@Body() data: IPostProductoOpcionRequest) {
    return this.productoOpcionService.crear(data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.productoOpcionService.eliminar(Number(id));
  }

  @Get()
  listar() {
    return this.productoOpcionService.listar();
  }
}
