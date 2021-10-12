import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from "./http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
    // Ensures that no additional properties are provided
    // especially useful to prevent users for giving themselves a role
    whitelist: true,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  await app.listen(8080);
}
bootstrap();
