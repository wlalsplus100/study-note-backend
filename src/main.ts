// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());

  // CORS 설정
  app.enableCors();

  // 정적 파일 제공
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/api/uploads',
  });

  // 유효성 검사 파이프
  app.useGlobalPipes(new ValidationPipe());

  // API 접두사
  app.setGlobalPrefix('api');

  await app.listen(3004);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
