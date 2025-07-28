import { Controller,Get,Post,Delete,Param,Body,UseGuards } from '@nestjs/common';
import { RecetaService } from 'src/providers/receta/receta.service';
import { IPostRecetaRequest } from 'src/controllers/receta/dto/IPostRecetaRequest';
import { IPostRecetaResponse } from 'src/controllers/receta/dto/IPostRecetaResponse';
import { Receta } from 'src/controllers/database/entities/receta.entity';
import { ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBody,ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/controllers/auth/jwt-auth.guard';

@ApiTags('Receta')
@ApiBearerAuth() // Swagger mostrará que necesita token
@UseGuards(JwtAuthGuard) // Protege todas las rutas
@Controller('receta')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las recetas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de recetas',
    type: [Receta],
  })
  async getAll(): Promise<Receta[]> {
    return await this.recetaService.getAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Agregar una nueva receta (ingrediente a producto)',
  })
  @ApiBody({ type: IPostRecetaRequest })
  @ApiResponse({
    status: 200,
    description: 'Ingrediente agregado al producto',
    type: Object,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o faltantes en la solicitud',
  })
  async postReceta(
    @Body() request: IPostRecetaRequest,
  ): Promise<IPostRecetaResponse> {
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
  @ApiOperation({
    summary: 'Eliminar una receta por producto e ingrediente',
  })
  @ApiParam({ name: 'idProducto', type: Number })
  @ApiParam({ name: 'idIngrediente', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Receta eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Receta no encontrada',
  })
  async deleteReceta(
    @Param('idProducto') idProducto: string,
    @Param('idIngrediente') idIngrediente: string,
  ): Promise<void> {
    await this.recetaService.delete(+idProducto, +idIngrediente);
  }
}
