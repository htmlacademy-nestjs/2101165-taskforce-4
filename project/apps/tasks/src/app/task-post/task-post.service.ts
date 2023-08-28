import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskPostRepository } from './task-post.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskPostEntity } from './task-post.entity';
import dayjs from 'dayjs';
import { TASK_NOT_FOUND } from './task-post.constant';
import { TaskCategoryRepository } from '../task-category/task-category.repository';
import { PostQuery } from './query/post.query';
import { Task } from '@project/shared/app-types';

@Injectable()
export class TaskPostService {
  constructor(
    private readonly taskPostRepository: TaskPostRepository,
    private readonly taskCategoryRepository: TaskCategoryRepository
  ) {  }

  async create(dto: CreateTaskDto) {
    const category = await this.taskCategoryRepository.find(dto.category);

    const postEntity = new TaskPostEntity({
       ...dto,
       tillDate: dto.tillDate ? new Date(dto.tillDate) : undefined,
       category,
       comments: [],
       tags: []
      });
    return this.taskPostRepository.create(postEntity);
  }

  public async delete(id: number) {
    const existTask = await this.taskPostRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    await this.taskPostRepository.destroy(id);
  }

  public async getTask(id: number) {
    const existTask = await this.taskPostRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    return existTask;
  }

  public async getTasks(query: PostQuery): Promise<Task[]> {
    return this.taskPostRepository.find(query);
  }

  public async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    const existTask = await this.taskPostRepository.findById(id);
    
    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    const updatedTask = new TaskPostEntity({
      existTask,
      ...dto
     });

    return this.taskPostRepository.create(updatedTask);
  }
}
