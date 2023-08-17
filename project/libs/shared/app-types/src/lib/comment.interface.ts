export interface Comment {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  taskId?: number;
  message: string;
  userId: string;
}