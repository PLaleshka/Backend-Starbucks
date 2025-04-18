import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ClienteService } from 'src/providers/cliente/cliente.service';
import { PedidoService } from 'src/providers/pedido/pedido.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/controllers/database/entities/cliente.entity.ts';
import { Pedido } from 'src/controllers/database/entities/pedido.entity.ts';
import { PedidoController } from 'src/controllers/pedido/pedido.controller';
import { ClienteController } from 'src/controllers/cliente/cliente.controller';

@Module({
  imports: [
    //DatabaseModule
    TypeOrmModule.forFeature([Cliente, Pedido])  
  ],
  controllers: [ClienteController, PedidoController],
  providers: [ClienteService, PedidoService],
})
export class ControllersModule {}
