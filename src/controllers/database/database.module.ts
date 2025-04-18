import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity.ts';
import { Pedido } from './entities/pedido.entity.ts';

@Module({
    imports: [
      TypeOrmModule.forFeature([Cliente, Pedido]),
    ],
    exports: [
      TypeOrmModule, 
    ],
    providers: []
  })
  export class DatabaseModule {}
