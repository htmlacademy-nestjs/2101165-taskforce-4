import { Task, Category, Tag, Comment } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class TaskPostEntity implements Entity<TaskPostEntity> ,Task {
  public id: string;
  public title: string;
  public description: string;
  public category: Category[];
  public price: number;
  public tillDate?: Date;
  public city: string;
  public picture: string;
  public publishedAt: Date;
  public createdAt: Date;
  public address?: string;
  public tags?: Tag[];
  public userId: string;
  public comments?: Comment[];

  constructor(post: Task) {
    this.fillEntity(post);
  }

  public toObject(): TaskPostEntity {
    return {
      ...this,
      category: [...this.category],
      comments: [...this.comments],
      tags: [...this.tags],
    };
  };

  public fillEntity(entity: Task): void {
    this.title = entity.title;
    this.description = entity.description;
    this.price = entity.price;
    this.address = entity.address;
    this.city = entity.city;
    this.publishedAt = new Date();
    this.userId = entity.userId;
    this.comments = [];
    this.category = [...entity.category];
    this.tags = [];
    this.tillDate = entity.tillDate;
    this.picture = entity.picture;
    this.createdAt = new Date();

  };
}