import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de órdenes de servicio')
    .setDescription('API para administrar los servicios, clientes, tecnicos, y peticiones del servicio')
    .setVersion('1.0')    
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT__SERVER || 3001);
}
bootstrap();
