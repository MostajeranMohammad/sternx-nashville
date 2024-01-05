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
@ApiTags('tasks')
@Controller('tasks')
export class TasksApiController {
  constructor() {}

  @ApiOperation({ summary: 'Create a task' })
  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    return 'Task created';
  }

  @ApiOperation({ summary: 'Get tasks' })
  @ApiQuery({ name: 'page_size', type: Number, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @Get()
  async getTasks(
    @Query('page_size') pageSize: number,
    @Query('page') page: number,
  ) {
    return ['Tasks list'];
  }

  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return 'Task updated';
  }

  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return 'Task deleted';
  }
}
