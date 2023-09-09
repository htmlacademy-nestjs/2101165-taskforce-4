/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The «Tasks» service')
    .setDescription('Tasks service API')
    .setVersion('1.0')
    .build();

  const GLOBAL_PREFIX = 'api';
  const document = SwaggerModule.createDocument(app, config);
  const DEFAULT_PORT = 3333;
  const port = process.env.PORT || DEFAULT_PORT;

  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  SwaggerModule.setup('spec', app, document);
  
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
