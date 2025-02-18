import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  app.enableCors({
    origin: '*', // Allow all domains (you can restrict this as needed)
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization, Content-Disposition', // Allowed headers
  });
  console.log(`Server is running on port ${port}`);
  await app.listen(port);
}
bootstrap();
