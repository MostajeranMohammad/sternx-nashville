import { Module } from '@nestjs/common';
import { TasksWsController } from './controllers/tasks-ws.controller';
import { TasksApiController } from './controllers/tasks-api.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NashvilleGrpcClientService } from './providers/nashville-grpc-client.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'GALLATIN_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'tasks',
            protoPath: join(__dirname, '../proto/tasks.proto'),
            url: `${configService.get<string>(
              'NASHVILLE_GRPC_ENDPOINT',
            )}:${configService.get<number>('NASHVILLE_GRPC_PORT')}`,
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [TasksApiController],
  providers: [TasksWsController, NashvilleGrpcClientService],
})
export class TasksModule {}
