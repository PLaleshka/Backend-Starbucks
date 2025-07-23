import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  app.setGlobalPrefix('api');

  // 🔹 Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Starbucks API')
    .setDescription('Documentación de la API del backend del sistema Starbucks')
    .setVersion('1.0')
    .addBearerAuth() // Permite mostrar el botón "Authorize" para JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // http://localhost:3000/api/docs
  // Prefijo global opcional
  ////setGlobalPrefix('api'); // puedes quitarlo si no lo usas

  await app.listen(3000);
}

bootstrap();
