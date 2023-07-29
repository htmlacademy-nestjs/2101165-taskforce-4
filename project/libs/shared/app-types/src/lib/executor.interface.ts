import { City } from './city.enum';
import {UserRole} from './user-role.enum';

export interface Executor {
  id: string;
  email: string;
  name: string;
  dateOfRegistration: Date;
  age: number;
  avatar: string;
  passwordHash: string;
  role: UserRole;
  about: string;
  city: City;
  rating: string;
  specialization: string;
  ratingPosition: number;
  doneTask: number;
  failedTask: number;
}
