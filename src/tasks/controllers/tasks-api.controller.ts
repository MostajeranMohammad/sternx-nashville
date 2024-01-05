import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CreateTaskDto } from '../dto/create-task.dto';
import { NashvilleGrpcClientService } from '../providers/nashville-grpc-client.service';
@ApiTags('tasks')
@Controller('tasks')
export class TasksApiController {
  constructor(private readonly tasksService: NashvilleGrpcClientService) {}

  @ApiOperation({ summary: 'Create a task' })
  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body);
  }

  @ApiOperation({ summary: 'Get tasks' })
  @ApiQuery({ name: 'page_size', type: Number, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @Get()
  getTasks(@Query('page_size') pageSize: number, @Query('page') page: number) {
    return this.tasksService.getAllTasks(pageSize, page);
  }

  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.tasksService.updateTask(id, body);
  }

  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
