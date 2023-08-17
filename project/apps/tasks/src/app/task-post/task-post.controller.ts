import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { TaskPostService } from './task-post.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiResponse } from '@nestjs/swagger';
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
  public async show(@Param('id') id: string) {
    const existTask = await this.taskService.getTask(id);
    return fillObject(TaskRdo, existTask);
  }

  // @ApiResponse({
  //   type: TaskRdo,
  //   status: HttpStatus.CREATED,
  //   description: 'The task has been successfully updated.'
  // })
  // @Patch(':id')
  // public async update(@Body() dto: UpdateTaskDto, @Param('id') id: string) {
  //   const task = await this.taskService.update(id, dto);
  //   return fillObject(TaskRdo, task);
  // }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task deleted'
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.taskService.delete(id);
  }
}
