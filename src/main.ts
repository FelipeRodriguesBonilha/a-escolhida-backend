import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedsService } from './seeds/seeds.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
