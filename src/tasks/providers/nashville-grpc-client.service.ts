import { Injectable } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';

@Injectable()
export class NashvilleGrpcClientService {
  @Client({
    transport: Transport.GRPC,
    options: {
      url: 'your-grpc-server-url',
      package: 'your-grpc-service-package',
      protoPath: 'your-grpc-service-proto-path',
    },
  })
  private client: ClientGrpc;

  // private grpcService: YourGrpcService;

  constructor() {
    // this.grpcService =
    //   this.client.getService<YourGrpcService>('YourGrpcService');
  }

  // createTask(request: CreateTaskRequest): Observable<CreateTaskResponse> {
  //   return this.grpcService.createTask(request);
  // }

  // updateTask(request: UpdateTaskRequest): Observable<UpdateTaskResponse> {
  //   return this.grpcService.updateTask(request);
  // }

  // deleteTask(request: DeleteTaskRequest): Observable<DeleteTaskResponse> {
  //   return this.grpcService.deleteTask(request);
  // }

  // getAllTasks(request: GetAllTasksRequest): Observable<GetAllTasksResponse> {
  //   return this.grpcService.getAllTasks(request);
  // }
}
