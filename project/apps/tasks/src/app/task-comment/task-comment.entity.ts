import { Entity } from '@project/util/util-types';
import { Comment } from '@project/shared/app-types';


export class TaskCommentEntity implements Entity<TaskCommentEntity> ,Comment {
  public commentId?: number;
  public text: string;
  public taskId: number;
  public userId: string;
  public createdAt?: Date;

  constructor(post: Comment) {
    this.fillEntity(post);
  }

  public fillEntity(entity: any) {
    
  }

  public toObject(): TaskCommentEntity {
    
  }
}