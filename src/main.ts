import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'tasks',
      protoPath: join(__dirname, 'tasks/tasks.proto'),
      url: `${configService.get<string>(
        'nashvilleGrpcEndpoint',
      )}:${configService.get<number>('nashvilleGrpcPort')}`,
    },
  });
  await app.startAllMicroservices();
  await app.listen(
    `${configService.get<string>('host')}:${configService.get<number>('port')}`,
  );
}
bootstrap();
