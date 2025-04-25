import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedido } from 'src/controllers/database/entities/detalle-pedido.entity';
import { DetallePedidoController } from './detalle-pedido.controller';
import { DetallePedidoService } from 'src/providers/detalle-pedido/detalle-pedido.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePedido])],
  controllers: [DetallePedidoController],
  providers: [DetallePedidoService],
})
export class DetallePedidoModule {}
