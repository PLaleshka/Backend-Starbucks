import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Pedido } from './entities/pedido.entity';
import { AdministradorEntity } from './entities/administrador.entity';
import { TiendaEntity } from './entities/tienda.entity';
import { Barista } from './entities/barista.entity';
import { Producto } from './entities/producto.entity';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { Ingrediente } from './entities/ingrediente.entity';
import { Inventario } from './entities/inventario.entity';
import { Stock } from './entities/stock.entity';
import { Receta } from './entities/receta.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Cliente, Pedido, AdministradorEntity, TiendaEntity, Barista, Producto,
        DetallePedido, Ingrediente, Inventario, Stock, Receta
      ]),
    ],
    exports: [
      TypeOrmModule, 
    ],
    providers: []
  })
  export class DatabaseModule {}
