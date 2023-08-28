import { TaskPostEntity } from './task-post.entity';
import { Task } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { PostQuery } from './query/post.query';

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

  public find({limit, category, sortDirection, page}: PostQuery): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        category: {
          some: {
            categoryId: {
              in: category
            }
          }
        }
      },
      take: limit,
      include: {
        comments: true,
        category: true,
        tags: true,
      },
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(taskId: number, item: TaskPostEntity): Promise<Task> {
    const entityData = item.toObject();
    
    await this.prisma.task.delete({
      where: {taskId}
    })

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

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {taskId}
    })
  }

}
