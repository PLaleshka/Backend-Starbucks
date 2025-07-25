import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoOpcion } from 'src/controllers/database/entities/producto-opcion.entity';
import { IPostProductoOpcionResponse } from 'src/controllers/producto-opcion/dto/IPostProductoOpcionResponse.dto';
import { IPostProductoOpcionRequest } from 'src/controllers/producto-opcion/dto/IPostProductoOpcionRequest.dot';
import { IDeleteProductoOpcionResponse } from 'src/controllers/producto-opcion/dto/IDeleteProductoOpcionResponse.dto';

@Injectable()
export class ProductoOpcionService {
  constructor(
    @InjectRepository(ProductoOpcion)
    private readonly productoOpcionRepo: Repository<ProductoOpcion>,
  ) {}

  async crear(data: IPostProductoOpcionRequest): Promise<IPostProductoOpcionResponse> {
    const nuevo = this.productoOpcionRepo.create({
      producto: { idProducto: data.idProducto } as any,
      opcion: { idOpcion: data.idOpcion } as any,
    });
    const guardado = await this.productoOpcionRepo.save(nuevo);
    return { mensaje: 'Relación guardada', id: guardado.id };
  }

  async eliminar(id: number): Promise<IDeleteProductoOpcionResponse> {
    await this.productoOpcionRepo.delete(id);
    return { mensaje: 'Relación eliminada' };
  }

  async listar(): Promise<ProductoOpcion[]> {
    return this.productoOpcionRepo.find({ relations: ['producto', 'opcion'] });
  }
}
