import { Module } from '@nestjs/common';
import { TasksWsController } from './controllers/tasks-ws.controller';
import { TasksApiController } from './controllers/tasks-api.controller';

@Module({
  controllers: [TasksApiController],
  providers: [TasksWsController],
})
export class TasksModule {}
