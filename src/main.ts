import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Simple Assets API Docs for Simple NFT VGA and News NFT')
  .setDescription('API to connect to Simple Assets in TLK-CHAIN')
  .setVersion('0.01')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('explorer', app, document);
  await app.listen(3000);
  
}
bootstrap();
