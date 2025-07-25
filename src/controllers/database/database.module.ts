import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { TiendaEntity } from './entities/tienda.entity';
import { Producto } from './entities/producto.entity';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { Ingrediente } from './entities/ingrediente.entity';
import { Inventario } from './entities/inventario.entity';
import { Stock } from './entities/stock.entity';
import { Receta } from './entities/receta.entity';
import { Usuario } from './entities/usuario.entity';
import { OpcionPersonalizacion } from './entities/opcion-personalizacion.entity';
import { ProductoOpcion } from './entities/producto-opcion.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Usuario, Pedido, TiendaEntity, Producto,
        DetallePedido, Ingrediente, Inventario, Stock, Receta, 
        OpcionPersonalizacion, ProductoOpcion
      ]),
    ],
    exports: [
      TypeOrmModule, 
    ],
    providers: []
  })
  export class DatabaseModule {}
