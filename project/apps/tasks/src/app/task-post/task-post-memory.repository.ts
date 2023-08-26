import { CRUDRepository } from '@project/util/util-types';
import { TaskPostEntity } from './task-post.entity';
import { Task } from '@project/shared/app-types';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskPostMemoryRepository implements CRUDRepository<TaskPostEntity, string, Task> {
  private repository: Record<string, Task> = {};

  public async create(item: TaskPostEntity): Promise<Task> {
    const entry = { ...item.toObject(), _id: randomUUID()};
    this.repository[entry._id] = entry;

    return entry;
  }

  public async findById(id: string): Promise<Task> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: TaskPostEntity): Promise<Task> {
    this.repository[id] = { ...item.toObject()};
    return this.findById(id);
  }
}
