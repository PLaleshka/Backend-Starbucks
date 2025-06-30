import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Stock } from 'src/controllers/database/entities/stock.entity';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';
import { IPutStockRequest } from 'src/controllers/stock/dto/IPutStockRequest';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepo: Repository<Stock>,

    @InjectRepository(TiendaEntity)
    private readonly tiendaRepo: Repository<TiendaEntity>,

    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>
  ) {}

  async getAll(): Promise<Stock[]> {
    return await this.stockRepo.find();
  }

  async create(data: { idTienda: number; idProducto: number; cantidad: number }): Promise<Stock> {
    const tienda = await this.tiendaRepo.findOneBy({ idTienda: data.idTienda });
    if (!tienda) throw new Error('Tienda no encontrada');

    const producto = await this.productoRepo.findOneBy({ idProducto: data.idProducto });
    if (!producto) throw new Error('Producto no encontrado');

    const stock = this.stockRepo.create({ cantidad: data.cantidad, tienda, producto });
    return await this.stockRepo.save(stock);
  }

  async update(id: number, data: IPutStockRequest): Promise<UpdateResult> {
    return await this.stockRepo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.stockRepo.delete(id);
  }
}