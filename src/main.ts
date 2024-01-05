import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'tasks',
  //     protoPath: join(__dirname, 'proto/tasks.proto'),
  //     url: `${configService.get<string>(
  //       'NASHVILLE_GRPC_ENDPOINT',
  //     )}:${configService.get<number>('NASHVILLE_GRPC_PORT')}`,
  //   },
  // });
  // await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Nashville API')
    .setDescription('an api and ws gateway for sternx task management services')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
