import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://127.0.0.1:8080'] });

  // --- Swagger setup -------------
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('CRUD endpoints with MongoDB backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);   // UI served at /api
  // --------------------------------

  await app.listen(3000);
}
bootstrap();
