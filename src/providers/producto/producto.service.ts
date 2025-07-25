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

  public async findAllPaginated(tiendaId: number, page: number, limit: number): Promise<any[]> {
    const skip = (page - 1) * limit;

    const productos = await this.productoRepository.createQueryBuilder('producto')
      .leftJoinAndSelect('producto.stocks', 'stock', 'stock.tienda = :tiendaId', { tiendaId })
      .orderBy('producto.idProducto', 'ASC')
      .skip(skip)
      .take(limit)
      .getMany();

    return productos.map(p => {
      const stockInfo = p.stocks.length > 0 ? p.stocks[0] : null;
      const cantidad = stockInfo ? stockInfo.cantidad : 0;

      return {
        idProducto: p.idProducto,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: p.precio,
        categoria: p.categoria,
        isAvailable: cantidad > 0,
        stock: cantidad,
        imagen: p.imagen,
      };
    });
  }

  public async getProducto(id: number): Promise<Producto> {
    const result = await this.productoRepository.findOneBy({ idProducto: id });
    if (!result) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }
    return result;
  }

  public async getProductoConOpciones(id: number): Promise<Producto | null> {
    return await this.productoRepository.findOne({
      where: { idProducto: id },
      relations: ['productoOpciones', 'productoOpciones.opcion'],
    });
  }

  public async create(productoDto: ProductoDTO): Promise<Producto> {
    const producto = new Producto();
    producto.nombre = productoDto.nombre;
    producto.precio = productoDto.precio;
    producto.descripcion = productoDto.descripcion ?? '';
    producto.categoria = productoDto.categoria;

    // Si decides usar imagen más adelante:
    // producto.imagen = productoDto.imagen;

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
