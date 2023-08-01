import { Task, City } from '@project/shared/app-types';

export class TaskEntity implements Task {
  public _id?: string;
  public name: string;
  public description: string;
  public category: string;
  public price: string;
  public tillDate: Date;
  public city: City;
  public picture: string;
  public address: string;
  public tags: string;
  public userId: string;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public toObject() {
    return {
      _id: this._id,
      name: this.name,
      description: this.description,
      category: this.category,
      price: this.price,
      tillDate: this.tillDate,
      city: this.city,
      picture: this.picture,
      address: this.address,
      tags: this.tags,
      userId: this.userId
    }
  };

  public fillEntity(task: Task) {
    this._id = task._id;
    this.name = task.name;
    this.description = task.description;
    this.category = task.category;
    this.price = task.price;
    this.tillDate = task.tillDate;
    this.city = task.city;
    this.picture = task.picture;
    this.address = task.address;
    this.tags = task.tags;
    this.userId = task.userId;
  };
}