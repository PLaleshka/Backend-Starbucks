import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Pedido } from './entities/pedido.entity';
import { Administrador } from './entities/administrador.entity';
import { Tienda } from './entities/tienda.entity';
import { Barista } from './entities/barista.entity';
import { Producto } from './entities/producto.entity';
import { DetallePedido } from './entities/detalle-pedido.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Cliente, Pedido, Administrador, Tienda, Barista, Producto,
        DetallePedido
      ]),
    ],
    exports: [
      TypeOrmModule, 
    ],
    providers: []
  })
  export class DatabaseModule {}
