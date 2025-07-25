import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OpcionPersonalizacionService } from 'src/providers/opcion-personalizacion/opcion.personalizacion.service';
import { IPostOpcionPersonalizacionRequest } from './dto/IPostOpcionPersonalizacionRequest.dto';
import { IPutOpcionPersonalizacionRequest } from './dto/IPutOpcionPersonalizacionRequest.dot';


@Controller('opciones-personalizacion')
export class OpcionPersonalizacionController {
  constructor(private readonly service: OpcionPersonalizacionService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() data: IPostOpcionPersonalizacionRequest) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: IPutOpcionPersonalizacionRequest) {
    return this.service.update({ ...data, idOpcion: id });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
