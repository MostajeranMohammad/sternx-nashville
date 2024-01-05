import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateTaskResponse,
  DeleteTaskResponse,
  GetAllTasksResponse,
  TasksService,
  UpdateTaskResponse,
} from 'src/proto/tasks-interfaces';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class NashvilleGrpcClientService implements OnModuleInit {
  constructor(
    @Inject('GALLATIN_SERVICE') private readonly client: ClientGrpc,
  ) {}
  private tasksGrpcService: TasksService;

  onModuleInit() {
    this.tasksGrpcService =
      this.client.getService<TasksService>('TasksService');
  }

  createTask(body: CreateTaskDto): Observable<CreateTaskResponse> {
    return this.tasksGrpcService.CreateTask({
      title: body.title,
      description: body.description,
      parentTaskId: body.parentId,
    });
  }

  updateTask(
    taskId: string,
    body: UpdateTaskDto,
  ): Observable<UpdateTaskResponse> {
    return this.tasksGrpcService.UpdateTask({
      id: taskId,
      title: body.title,
      description: body.description,
      parentTaskId: body.parentId,
    });
  }

  deleteTask(taskId: string): Observable<DeleteTaskResponse> {
    return this.tasksGrpcService.DeleteTask({
      id: taskId,
    });
  }

  getAllTasks(pageSize: number, page: number): Observable<GetAllTasksResponse> {
    return this.tasksGrpcService.GetAllTasks({
      pageNumber: page,
      pageSize,
    });
  }
}
