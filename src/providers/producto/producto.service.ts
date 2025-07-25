import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { ProductoUpdateDTO } from 'src/controllers/producto/dto/ProductoUpdateDTO';
import { ProductoDTO } from 'src/controllers/producto/dto/producto.dto';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
    ) {}

    public async getAllProductos(): Promise<Producto[]> {
        return await this.productoRepository.find();
    }

    public async getProducto(id: number): Promise<Producto> {
        try {
            const result = await this.productoRepository
              .createQueryBuilder('producto')
              .where('producto.idProducto = :id', { id })
              .getOne();
 
            if (!result) {
              throw new Error(`Producto con id ${id} no encontrado`);
            }

            return result;
        } catch (error: any) {
            console.error('ERROR EN getProducto:', error.message);
            throw new Error(error);
        }
    }

    public async create(productoDto: ProductoDTO): Promise<Producto> {
        const producto = new Producto();
        producto.nombre = productoDto.nombre;
        producto.precio = productoDto.precio;
        producto.descripcion = productoDto.descripcion ?? '';
        producto.categoria = productoDto.categoria;

        return await this.productoRepository.save(producto);
    }

    public async update(id: number, productoDto: ProductoUpdateDTO): Promise<UpdateResult | undefined> {
        const updateData: Partial<Producto> = {
            nombre: productoDto.nombre,
            precio: productoDto.precio,
            descripcion: productoDto.descripcion,
            categoria: productoDto.categoria,
        };

        const result = await this.productoRepository.update(id, updateData);

        return result.affected === 0 ? undefined : result;
    }

    public async delete(id: number): Promise<DeleteResult> {
      return await this.productoRepository.delete(id);
  }
  
}
