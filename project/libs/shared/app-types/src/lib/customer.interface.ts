import { City } from './city.enum';
import { UserRole } from './user-role.enum';

export interface Customer {
  id: string;
  email: string;
  name: string;
  dateOfRegistration: Date;
  avatar: string;
  passwordHash: string;
  role: UserRole;
  postedTask: number;
  statusNewTask: number;
  about: string;
  city: City;
}
