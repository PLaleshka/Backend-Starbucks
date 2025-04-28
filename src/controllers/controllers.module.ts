import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ClienteService } from 'src/providers/cliente/cliente.service';
import { PedidoService } from 'src/providers/pedido/pedido.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/controllers/database/entities/cliente.entity';
import { Pedido } from 'src/controllers/database/entities/pedido.entity';
import { PedidoController } from 'src/controllers/pedido/pedido.controller';
import { ClienteController } from 'src/controllers/cliente/cliente.controller';
import { AdministradorEntity } from './database/entities/administrador.entity';
import { TiendaEntity } from './database/entities/tienda.entity';
import { Barista } from './database/entities/barista.entity';
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

@Module({
  imports: [
    //DatabaseModule
    TypeOrmModule.forFeature([Cliente, Pedido, AdministradorEntity, TiendaEntity, Barista,
      Producto, DetallePedido
    ])  
  ],
  controllers: [ClienteController, PedidoController, AdministradorController,
    TiendaController, BaristaController, ProductoController, DetallePedidoController
  ],
  providers: [ClienteService, PedidoService, AdministradorService,
    TiendaService, BaristaService, ProductoService, DetallePedidoService
  ],
})
export class ControllersModule {}
