import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { ClienteController } from './controllers/cliente/cliente.controller';
import { PedidoController } from './controllers/pedido/pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cliente } from './controllers/database/entities/cliente.entity';
import { Pedido } from './controllers/database/entities/pedido.entity';
import { ClienteService } from './providers/cliente/cliente.service';
import { PedidoService } from './providers/pedido/pedido.service';
import { TiendaService } from './providers/tienda/tienda.service';
import { AdministradorService } from './providers/administrador/administrador.service';
import { Administrador } from './controllers/database/entities/administrador.entity';
import { Tienda } from './controllers/database/entities/tienda.entity';
import { TiendaController } from './controllers/tienda/tienda.controller';
import { AdministradorController } from './controllers/administrador/administrador.controller';
import { Producto } from './controllers/database/entities/producto.entity';
import { ProductoController } from './controllers/producto/producto.controller';
import { ProductoService } from './providers/producto/producto.service';
import { Barista } from './controllers/database/entities/barista.entity';
import { BaristaController } from './controllers/barista/barista.controller';
import { BaristaService } from './providers/barista/barista.service';
import { DetallePedidoController } from './controllers/detalle-pedido/detalle-pedido.controller';
import { DetallePedidoService } from './providers/detalle-pedido/detalle-pedido.service';
import { DetallePedido } from './controllers/database/entities/detalle-pedido.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Cliente, Pedido, Administrador, Tienda, Producto, Barista, DetallePedido],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Cliente, Pedido, Administrador, Tienda, Producto, Barista, DetallePedido]),
    ControllersModule,
  ],
  controllers: [AppController, ClienteController, PedidoController, TiendaController, AdministradorController,
    ProductoController, BaristaController, DetallePedidoController
  ],
  providers: [AppService, ClienteService, PedidoService, AdministradorService, TiendaService, 
    ProductoService, BaristaService, DetallePedidoService
  ],
})
export class AppModule {}
