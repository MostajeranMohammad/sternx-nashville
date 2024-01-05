import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
  GetAllTasksRequest,
  GetAllTasksResponse,
  TasksService,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from 'src/proto/tasks-interfaces';

@Injectable()
export class NashvilleGrpcClientService implements OnModuleInit {
  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}
  private tasksGrpcService: TasksService;

  onModuleInit() {
    this.tasksGrpcService =
      this.client.getService<TasksService>('TasksService');
  }

  createTask(request: CreateTaskRequest): Observable<CreateTaskResponse> {
    return this.tasksGrpcService.CreateTask(request);
  }

  updateTask(request: UpdateTaskRequest): Observable<UpdateTaskResponse> {
    return this.tasksGrpcService.UpdateTask(request);
  }

  deleteTask(request: DeleteTaskRequest): Observable<DeleteTaskResponse> {
    return this.tasksGrpcService.DeleteTask(request);
  }

  getAllTasks(request: GetAllTasksRequest): Observable<GetAllTasksResponse> {
    return this.tasksGrpcService.GetAllTasks(request);
  }
}
