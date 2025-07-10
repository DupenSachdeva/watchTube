import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from "dotenv"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  dotenv.config();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,   
    forbidNonWhitelisted: true, 
    transform: true,    
  }));
  
  app.enableCors({
    origin: '*', // or '*' to allow all origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  

  await app.listen(3000);
}
bootstrap();
