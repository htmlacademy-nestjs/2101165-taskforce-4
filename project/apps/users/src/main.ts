/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The «Users» service')
    .setDescription('Users service API')
    .setVersion('1.0')
    .build();

  const GLOBAL_PREFIX = 'api';
  const configService = app.get(ConfigService);
  const document = SwaggerModule.createDocument(app, config);
  const port = configService.get('application.port');
  
  app.setGlobalPrefix(GLOBAL_PREFIX);

  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(port);
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
  Logger.log(
    `🎯  Current mode: ${configService.get('application.environment')}`
  )
}

bootstrap();
