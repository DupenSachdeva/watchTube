import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from "dotenv"
import { TimeoutInterceptor } from './engine/core/services/tmieout';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new TimeoutInterceptor());

  
  dotenv.config();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,   
    forbidNonWhitelisted: true, 
    transform: true,    
  }));
  
  app.enableCors({
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  

  await app.listen(5001);
}
bootstrap();
