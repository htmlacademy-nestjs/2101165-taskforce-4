import { Tag } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class TaskTagEntity implements Entity<TaskTagEntity>, Tag {
  public tagId: number;
  public title: string;
  public taskId: number;

  constructor(tag: Tag) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: Tag) {
    this.tagId = entity.tagId;
    this.title = entity.title;
    this.taskId = entity.taskId;
  }

  public toObject(): TaskTagEntity {
    return { ...this };
  }
}
