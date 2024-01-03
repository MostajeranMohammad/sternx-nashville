import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class TasksWsController {
  constructor() {}
}
