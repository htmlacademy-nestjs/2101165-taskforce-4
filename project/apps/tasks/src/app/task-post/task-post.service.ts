import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskPostMemoryRepository } from './task-post-memory.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskPostEntity } from './task-post.entity';
import dayjs from 'dayjs';
import { TASK_NOT_FOUND } from './task-post.constant';
import { TaskCategoryRepository } from '../task-category/task-category.repository';

@Injectable()
export class TaskPostService {
  constructor(
    private readonly taskPostRepository: TaskPostMemoryRepository,
    private readonly taskCategoryRepository: TaskCategoryRepository
  ) {  }

  async create(dto: CreateTaskDto) {
    const category = await this.taskCategoryRepository.find(dto.category);

    const postEntity = new TaskPostEntity({ ...dto, category, comments: [], tags: [] });
    return this.taskPostRepository.create(postEntity);
  }

  public async delete(id: string) {
    const existTask = await this.taskPostRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    await this.taskPostRepository.destroy(id);
  }

  public async getTask(id: string) {
    const existTask = await this.taskPostRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    return existTask;
  }
}
