import { City } from "@project/shared/app-types";

export class CreateTaskDto {
  public name: string;
  public description: string;
  public category: string;
  public price: string;
  public tillDate: Date;
  public city: City;
  public picture: string;
  public address: string;
  public tags: string;
}