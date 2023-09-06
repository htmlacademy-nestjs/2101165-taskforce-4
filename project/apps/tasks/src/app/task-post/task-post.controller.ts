import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { TaskPostService } from './task-post.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiResponse } from '@nestjs/swagger';
import { PostQuery } from './query/post.query';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskPostController {
  constructor(private readonly taskService: TaskPostService) {}

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.'
  })
  @Post('create')
  public async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.create(dto);
    return fillObject(TaskRdo, newTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task found'
  })
  @Get(':id')
  public async show(@Param('id') id: number) {
    const existTask = await this.taskService.getTask(id);
    return fillObject(TaskRdo, existTask);
  }

  @Get('/')
  async index(@Query() query: PostQuery) {
    const existTasks = await this.taskService.getTasks(query);
    return fillObject(TaskRdo, existTasks);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task deleted'
  })
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    await this.taskService.delete(id);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task has been updated.'
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const updatedTask = await this.taskService.updateTask(id, dto);
    return fillObject(TaskRdo, updatedTask)
  }
}
