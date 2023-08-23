import { TaskPostEntity } from './task-post.entity';
import { Task } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskPostRepository implements CRUDRepository<TaskPostEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskPostEntity): Promise<Task> {
    const entityData = item.toObject();
    return this.prisma.task.create({
      data: {
        ...entityData,
        comments: {
          connect: []
        },
        category: {
          connect: entityData.category
            .map(({ categoryId }) => ({ categoryId }))
        },
        tags: {
          connect: []
        },
      },
      include: {
        comments: true,
        category: true,
        tags: true
      }
    });
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({

    });
  }

  public findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      
    });
  }

  public find(ids: number[] = []): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        
      }
    });
  }

  public update(taskId: number, item: TaskPostEntity): Promise<Task> {
    return this.prisma.task.update({
      where: {
        taskId
      },
      data: { ...item.toObject(), taskId}
    });
  }
}
