import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { RecetaService } from 'src/providers/receta/receta.service';
import { IPostRecetaRequest } from 'src/controllers/receta/dto/IPostRecetaRequest';
import { IPostRecetaResponse } from 'src/controllers/receta/dto/IPostRecetaResponse';
import { Receta } from 'src/controllers/database/entities/receta.entity';

@Controller('receta')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Get()
  async getAll(): Promise<Receta[]> {
    return await this.recetaService.getAll();
  }

  @Post()
  async postReceta(@Body() request: IPostRecetaRequest): Promise<IPostRecetaResponse> {
    const response: IPostRecetaResponse = {
      data: null,
      statusCode: 200,
      statusDescription: 'Ingrediente agregado al producto',
      errores: null,
    };

    if (request) {
      const receta = new Receta();
      receta.idProducto = request.idProducto;
      receta.idIngrediente = request.idIngrediente;
      receta.cantidad = request.cantidad;

      const result = await this.recetaService.create(receta);
      response.data = result;
    }

    return response;
  }

  @Delete(':idProducto/:idIngrediente')
  async deleteReceta(
    @Param('idProducto') idProducto: string,
    @Param('idIngrediente') idIngrediente: string
  ): Promise<void> {
    await this.recetaService.delete(+idProducto, +idIngrediente);
  }
}
