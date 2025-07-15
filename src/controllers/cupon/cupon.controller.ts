import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Cupon } from 'src/controllers/database/entities/cupon.entity';
import { IPostCuponRequest } from './dto/IPostCuponRequest';
import { IPostCuponResponse } from './dto/IPostCuponResponse';
import { IPutCuponRequest } from './dto/IPutCuponRequest';
import { IPutCuponResponse } from './dto/IPutCuponResponse';
import { CuponService } from 'src/providers/cupon/cupon.service';

@Controller('cupon')
export class CuponController {
  constructor(private readonly cuponService: CuponService) {}

  @Get()
  async getAll(): Promise<Cupon[]> {
    return await this.cuponService.findAll();
  }

  @Post()
  async create(@Body() dto: IPostCuponRequest): Promise<IPostCuponResponse> {
    const response: IPostCuponResponse = {
      data: null,
      statusCode: 200,
      statusDescription: 'Cupón creado correctamente',
      errors: null,
    };

    try {
      const cupon = await this.cuponService.create(dto);
      response.data = cupon;
    } catch (error: any) {
      response.statusCode = 500;
      response.statusDescription = 'Error al crear cupón';
      response.errors = [error.message];
    }

    return response;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: IPutCuponRequest,
  ): Promise<IPutCuponResponse> {
    const response: IPutCuponResponse = {
      statusCode: 200,
      statusDescription: 'Cupón actualizado correctamente',
      errors: null,
    };

    try {
      await this.cuponService.update(id, dto);
    } catch (error: any) {
      response.statusCode = 500;
      response.statusDescription = 'Error al actualizar cupón';
      response.errors = [error.message];
    }

    return response;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.cuponService.delete(id);
    return { message: `Cupón con id ${id} eliminado correctamente` };
  }
}
