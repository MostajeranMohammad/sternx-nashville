import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CreateTaskDto } from '../dto/create-task.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TasksWsController {
  constructor() {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createTask')
  async createTask(client: Socket, @MessageBody() body: CreateTaskDto) {
    // const result = await this.tasksService.createTask(body);
    // this.server.emit('taskCreated', result);
    console.log('Task created');
  }

  @SubscribeMessage('getTasks')
  async getTasks(
    client: Socket,
    @MessageBody() body: { pageSize: number; page: number },
  ) {
    // const result = await this.tasksService.getTasks(body);
    // return result;
    console.log('Get tasks');
  }

  @SubscribeMessage('updateTask')
  async updateTask(
    client: Socket,
    @MessageBody() body: { id: string } & UpdateTaskDto,
  ) {
    // const result = await this.tasksService.updateTask(body);
    // this.server.emit('taskUpdated', result);
    // return 'Task updated';
    console.log('Task updated');
  }

  @SubscribeMessage('deleteTask')
  async deleteTask(client: Socket, @MessageBody() taskId: string) {
    // const result = await this.tasksService.deleteTask(body);
    // this.server.emit('taskDeleted', result);
    // return 'Task deleted';
    console.log('Task deleted');
  }
}
