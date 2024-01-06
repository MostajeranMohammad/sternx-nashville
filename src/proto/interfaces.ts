import { Observable } from 'rxjs';

export interface TasksService {
  CreateTask(request: CreateTaskRequest): Observable<CreateTaskResponse>;
  UpdateTask(request: UpdateTaskRequest): Observable<UpdateTaskResponse>;
  DeleteTask(request: DeleteTaskRequest): Observable<DeleteTaskResponse>;
  GetAllTasks(request: GetAllTasksRequest): Observable<GetAllTasksResponse>;
}

export interface Task {
  id?: string;
  parentTaskId?: string;
  parentTask?: Task;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  children?: Task[];
}

export interface CreateTaskRequest {
  parentTaskId?: string;
  title: string;
  description?: string;
}

export interface CreateTaskResponse {
  task: Task;
}

export interface UpdateTaskRequest {
  id: string;
  parentTaskId?: string;
  title?: string;
  description?: string;
}

export interface UpdateTaskResponse {
  task: Task;
}

export interface DeleteTaskRequest {
  id: string;
}

export interface DeleteTaskResponse {
  task: Task;
}

export interface GetAllTasksRequest {
  pageNumber: number;
  pageSize: number;
}

export interface GetAllTasksResponse {
  tasks: Task[];
}
