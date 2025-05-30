import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usamos la opción 'transform' para habilitar la conversión automática de tipos.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
    }),
  );
    
  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap();
