import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { PedidoController } from './controllers/pedido/pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Pedido } from './controllers/database/entities/pedido.entity';
import { TiendaEntity } from './controllers/database/entities/tienda.entity';
import { Producto } from './controllers/database/entities/producto.entity';
import { DetallePedido } from './controllers/database/entities/detalle-pedido.entity';
import { Ingrediente } from './controllers/database/entities/ingrediente.entity';
import { Inventario } from './controllers/database/entities/inventario.entity';
import { Receta } from './controllers/database/entities/receta.entity';
import { Stock } from './controllers/database/entities/stock.entity';
import { Usuario } from './controllers/database/entities/usuario.entity';

import { UsuarioController } from './controllers/usuario/usuario.controller';
import { TiendaController } from './controllers/tienda/tienda.controller';
import { ProductoController } from './controllers/producto/producto.controller';
import { DetallePedidoController } from './controllers/detalle-pedido/detalle-pedido.controller';
import { IngredienteController } from './controllers/ingrediente/ingrediente.controller';
import { InventarioController } from './controllers/inventario/inventario.controller';
import { RecetaController } from './controllers/receta/receta.controller';
import { StockController } from './controllers/stock/stock.controller';
import { LoginController } from './controllers/login/login.controller';

import { UsuarioService } from './providers/usuario/usuario.service';
import { PedidoService } from './providers/pedido/pedido.service';
import { TiendaService } from './providers/tienda/tienda.service';
import { ProductoService } from './providers/producto/producto.service';
import { DetallePedidoService } from './providers/detalle-pedido/detalle-pedido.service';
import { IngredienteService } from './providers/ingrediente/ingrediente.service';
import { InventarioService } from './providers/inventario/inventario.service';
import { RecetaService } from './providers/receta/receta.service';
import { StockService } from './providers/stock/stock.service';
import { LoginService } from './providers/login/login.service';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Config .env global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '3600s',
        },
      }),
      inject: [ConfigService],
    }),

    // TypeORM config
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          Usuario, Pedido, TiendaEntity, Producto,
          DetallePedido, Ingrediente, Inventario, Receta, Stock
        ],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),

    // Repositorios disponibles para inyección
    TypeOrmModule.forFeature([
      Usuario, Pedido, TiendaEntity, Producto,
      DetallePedido, Ingrediente, Inventario, Receta, Stock
    ]),

    ControllersModule,
  ],

  controllers: [
    AppController, UsuarioController, PedidoController, TiendaController,
    ProductoController, DetallePedidoController, LoginController,
    IngredienteController, InventarioController, RecetaController, StockController
  ],

  providers: [
    AppService, UsuarioService, PedidoService, TiendaService,
    ProductoService, DetallePedidoService, LoginService,
    IngredienteService, InventarioService, RecetaService, StockService
  ],
})
export class AppModule {}
