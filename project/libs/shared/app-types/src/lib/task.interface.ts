import { City } from "./city.enum";
import { Category } from './category.interface';
import { Comment } from './comment.interface';
import { Tag } from './tag.interface';

export interface Task {
  id?: string;
  name: string;
  description: string;
  category: Category[];
  price?: number;
  tillDate?: Date;
  city: City;
  picture?: string;
  address?: string;
  tags?: Tag[];
  userId: string;
  comments?: Comment[];
  createdAt?: Date;
  publishAt?: Date;
}
