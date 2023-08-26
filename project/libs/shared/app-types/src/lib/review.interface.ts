export interface Review {
  reviewId?: string;
  review: string;
  taskId: string;
  rating: number;
  userId: string;
  createdAt: Date;
}
