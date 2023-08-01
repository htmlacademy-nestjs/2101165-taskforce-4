import { City } from "./city.enum";

export interface Task {
  _id?: string;
  name: string;
  description: string;
  category: string;
  price: string;
  tillDate: Date;
  city: City;
  picture: string;
  address: string;
  tags: string;
  userId: string;
}
