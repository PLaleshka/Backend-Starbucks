import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { ProductoController } from './producto.controller';
import { ProductoService } from 'src/providers/producto/producto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
