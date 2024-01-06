import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CreateTaskResponse,
  DeleteTaskResponse,
  GetAllTasksResponse,
  TasksService,
  UpdateTaskResponse,
} from 'src/proto/interfaces';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
/**
 * NashvilleGrpcClientService is a service that interacts with the gRPC client for the TasksService.
 * It provides methods for creating, updating, deleting, and retrieving tasks.
 */
export class NashvilleGrpcClientService implements OnModuleInit {
  constructor(@Inject('TasksService') private readonly client: ClientGrpc) {}
  private tasksGrpcService: TasksService;

  onModuleInit() {
    this.tasksGrpcService =
      this.client.getService<TasksService>('TasksService');
  }

  /**
   * Creates a new task.
   * @param body - The data for creating the task.
   * @returns An Observable that emits the response of creating the task.
   */
  createTask(body: CreateTaskDto): Observable<CreateTaskResponse> {
    return this.tasksGrpcService.CreateTask({
      title: body.title,
      description: body.description,
      parentTaskId: body.parentId,
    });
  }

  /**
   * Updates an existing task.
   * @param taskId - The ID of the task to update.
   * @param body - The data for updating the task.
   * @returns An Observable that emits the response of updating the task.
   */
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

  /**
   * Deletes a task.
   * @param taskId - The ID of the task to delete.
   * @returns An Observable that emits the response of deleting the task.
   */
  deleteTask(taskId: string): Observable<DeleteTaskResponse> {
    return this.tasksGrpcService.DeleteTask({
      id: taskId,
    });
  }

  /**
   * Retrieves all tasks.
   * @param pageSize - The number of tasks to retrieve per page.
   * @param page - The page number of tasks to retrieve.
   * @returns An Observable that emits the response of retrieving all tasks.
   */
  getAllTasks(pageSize: string, page: string): Observable<GetAllTasksResponse> {
    return this.tasksGrpcService.GetAllTasks({
      pageNumber: parseInt(page, 10) || 1,
      pageSize: parseInt(pageSize, 10) || 10,
    });
  }
}
