import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { ClienteController } from './controllers/cliente/cliente.controller';
import { PedidoController } from './controllers/pedido/pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cliente } from './controllers/database/entities/cliente.entity.ts';
import { Pedido } from './controllers/database/entities/pedido.entity.ts';
import { ClienteService } from './providers/cliente/cliente.service';
import { PedidoService } from './providers/pedido/pedido.service';

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
        entities: [Cliente, Pedido],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Cliente, Pedido]),
    ControllersModule,
  ],
  controllers: [AppController, ClienteController, PedidoController],
  providers: [AppService, ClienteService, PedidoService],
})
export class AppModule {}
