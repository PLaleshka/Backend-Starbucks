import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ClienteService } from 'src/providers/cliente/cliente.service';
import { PedidoService } from 'src/providers/pedido/pedido.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from 'src/controllers/database/entities/pedido.entity';
import { PedidoController } from 'src/controllers/pedido/pedido.controller';
import { ClienteController } from 'src/controllers/usuario/cliente.controller';
import { TiendaEntity } from './database/entities/tienda.entity';
import { Producto } from './database/entities/producto.entity';
import { DetallePedido } from './database/entities/detalle-pedido.entity';
import { AdministradorController } from './administrador/administrador.controller';
import { TiendaController } from './tienda/tienda.controller';
import { BaristaController } from './barista/barista.controller';
import { ProductoController } from './producto/producto.controller';
import { DetallePedidoController } from './detalle-pedido/detalle-pedido.controller';
import { AdministradorService } from 'src/providers/administrador/administrador.service';
import { TiendaService } from 'src/providers/tienda/tienda.service';
import { BaristaService } from 'src/providers/barista/barista.service';
import { ProductoService } from 'src/providers/producto/producto.service';
import { DetallePedidoService } from 'src/providers/detalle-pedido/detalle-pedido.service';
import { Ingrediente } from './database/entities/ingrediente.entity';
import { Inventario } from './database/entities/inventario.entity';
import { Receta } from './database/entities/receta.entity';
import { Stock } from './database/entities/stock.entity';
import { IngredienteController } from './ingrediente/ingrediente.controller';
import { InventarioController } from './inventario/inventario.controller';
import { RecetaController } from './receta/receta.controller';
import { StockController } from './stock/stock.controller';
import { IngredienteService } from 'src/providers/ingrediente/ingrediente.service';
import { InventarioService } from 'src/providers/inventario/inventario.service';
import { RecetaService } from 'src/providers/receta/receta.service';
import { StockService } from 'src/providers/stock/stock.service';
import { Usuario } from './database/entities/usuario.entity';

@Module({
  imports: [
    //DatabaseModule
    TypeOrmModule.forFeature([Usuario, Pedido, TiendaEntity,
      Producto, DetallePedido, Ingrediente, Inventario, Receta, Stock
    ])  
  ],
  controllers: [ClienteController, PedidoController, AdministradorController,
    TiendaController, BaristaController, ProductoController, DetallePedidoController, 
    IngredienteController, InventarioController, RecetaController, StockController
  ],
  providers: [ClienteService, PedidoService, AdministradorService,
    TiendaService, BaristaService, ProductoService, DetallePedidoService,
    IngredienteService, InventarioService, RecetaService, StockService
  ],
})
export class ControllersModule {}
