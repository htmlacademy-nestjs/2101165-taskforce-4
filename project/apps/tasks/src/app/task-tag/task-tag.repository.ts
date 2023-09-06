import { TaskTagEntity } from './task-tag.entity';
import { Tag } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskTagRepository implements CRUDRepository<TaskTagEntity, number, Tag> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskTagEntity): Promise<Tag> {
    return this.prisma.tag.create({
      data: { ...item.toObject() },
    });
  }

  public async destroy(tagId: number): Promise<void> {
    await this.prisma.tag.delete({
      where: {
        tagId,
      },
    });
  }

  public findById(tagId: number): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: {
        tagId,
      },
    });
  }

  public findByName(title: string): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: { 
        title, 
      },
    });
  }

  public async findOrCreate(title: string): Promise<Tag> {
    const existTag = await this.findByName(title);
    if (!existTag) {
      const tag = new TaskTagEntity({ title });
      return await this.create(tag);
    }
    return existTag;
  }

  public async findOrCreateMany(texts: string[]): Promise<Tag[]> {
    const tags = [];
    texts.forEach((text) => {
      const tag = this.findOrCreate(text);
      tags.push(tag);
    });
    return await Promise.all(tags);
  }

  public find(ids: number[] = []): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      where: {
        tagId: {
          in: ids.length > 0 ? ids : undefined,
        },
      },
    });
  }

  public update(tagId: number, item: TaskTagEntity): Promise<Tag> {
    return this.prisma.tag.update({
      where: {
        tagId,
      },
      data: { ...item.toObject(), tagId },
    });
  }
  
}