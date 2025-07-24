import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ HABILITAR CORS para permitir llamadas desde Angular (localhost:4200)
  app.enableCors({
    origin: 'http://localhost:4200',
  });

  // Validación global con filtros de seguridad
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Prefijo global opcional
  ////setGlobalPrefix('api'); // puedes quitarlo si no lo usas

  await app.listen(3000);
}

bootstrap();
