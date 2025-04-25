import { Body, Controller, Post } from '@nestjs/common';
import { BaristaService } from 'src/providers/barista/barista.service';
import { IPostBaristaRequest } from './dto/IPostBaristaRequest';
import { IPostBaristaResponse } from './dto/IPostBaristaResponse';
import { Barista } from 'src/controllers/database/entities/barista.entity';
import { Get } from '@nestjs/common';

@Controller('barista')
export class BaristaController {
  constructor(private readonly baristaService: BaristaService) {}

  @Post()
  async postBarista(@Body() request: IPostBaristaRequest): Promise<IPostBaristaResponse> {
    const response: IPostBaristaResponse = {
      data: null,
      statusCode: 200,
      statusDescription: 'Barista agregado correctamente',
      errores: null,
    };

    if (request) {
      const nuevoBarista: Barista = {
        nombre: request.nombre,
        apellido: request.apellido,
        correoElectronico: request.correoElectronico,
        contraseña: request.contraseña,
        telefono: request.telefono,
      } as Barista;

      const baristaCreado = await this.baristaService.create(nuevoBarista);
      response.data = baristaCreado;
    }

    return response;
  }

  @Get()
  async getAllBaristas(): Promise<Barista[]> {
  return await this.baristaService.getAllBaristas();
}
}
