import { Category, Comment, Tag, Review, Response } from '../index';

export interface Task {
  taskId?: number;
  title: string;
  description: string;
  category: Category[];
  price: number;
  tillDate?: Date;
  city: string;
  picture?: string;
  address?: string;
  tags?: Tag[];
  userId: string;
  comments?: Comment[];
  createdAt?: Date;
  publishAt?: Date;
  executorId?: string;
  responsesCount?: number;
  commentsCount?: number;
  responses?: Response[];
  review?: Review;

}
