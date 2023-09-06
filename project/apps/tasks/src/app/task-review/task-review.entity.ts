import { Review } from "@project/shared/app-types";
import { Entity } from "@project/util/util-types";

export class TaskReviewEntity implements Entity<TaskReviewEntity>, Review {
  public reviewId?: number;
  public review: string;
  public taskId: number;
  public rating: number;
  public userId: string;
  public executorId: string;
  public createdAt?: Date;

  constructor (review: Review) {
    this.fillEntity(review)
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(entity: Review) {
    this.reviewId = entity.reviewId;
    this.review = entity.review;
    this.taskId = entity.taskId;
    this.rating = entity.rating;
    this.userId = entity.userId;
    this.executorId = entity.executorId;
    this.createdAt = entity.createdAt;
  }
}