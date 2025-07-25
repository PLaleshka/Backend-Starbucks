import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS para permitir acceso desde Angular
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Prefijo global para rutas
  app.setGlobalPrefix('api');

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Starbucks API')
    .setDescription('Documentación de la API del backend del sistema Starbucks')
    .setVersion('1.0')
    .addBearerAuth() // JWT support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // http://localhost:3000/api/docs

  await app.listen(3000);
}
bootstrap();
