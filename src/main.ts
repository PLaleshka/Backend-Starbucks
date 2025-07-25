import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ HABILITAR CORS para permitir llamadas desde Angular (localhost:4200)
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // Validación global con filtros de seguridad
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Prefijo global opcional
  ////setGlobalPrefix('api'); //
  app.use('/images', express.static(join(__dirname, '..', 'public', 'images')));
  await app.listen(3000);
}

bootstrap();
