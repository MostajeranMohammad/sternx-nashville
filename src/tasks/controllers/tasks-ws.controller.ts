import {
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
  namespace: '/ws/tasks',
})
export class TasksWsController {
  constructor() {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createTask')
  async createTask(client: Socket, body: CreateTaskDto) {
    // const result = await this.tasksService.createTask(body);
    // this.server.emit('taskCreated', result);
    client.emit('response', JSON.stringify(body));
  }

  @SubscribeMessage('getTasks')
  async getTasks(client: Socket, body: { pageSize: number; page: number }) {
    // const result = await this.tasksService.getTasks(body);
    // return result;
    client.emit('response', JSON.stringify(body));
  }

  @SubscribeMessage('updateTask')
  async updateTask(client: Socket, body: { id: string } & UpdateTaskDto) {
    // const result = await this.tasksService.updateTask(body);
    // this.server.emit('taskUpdated', result);
    // return 'Task updated';
    client.emit('response', JSON.stringify(body));
  }

  @SubscribeMessage('deleteTask')
  async deleteTask(client: Socket, taskId: string) {
    // const result = await this.tasksService.deleteTask(body);
    // this.server.emit('taskDeleted', result);
    // return 'Task deleted';
    client.emit('response', taskId);
  }
}
