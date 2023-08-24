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
        tags: {
          connect: []
        },
        category: {
          connect: entityData.category
            .map(({ categoryId }) => ({ categoryId }))
        },
        
      },
      include: {
        comments: true,
        category: true,
        tags: true
      }
    });
  }

  public async findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        taskId
      },
      include: {
        comments: true,
        category: true,
        tags: true,
      }
    });
  }

  public find(ids: number[] = []): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        taskId: {
          in: ids 
        } 
      },
      include: {
        comments: true,
        category: true,
        tags: true,
      }
    });
  }

  public async update(id: number, item: TaskPostEntity): Promise<Task> {
    throw new Error("Method not implemented.");
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {taskId}
    })
  }

}
