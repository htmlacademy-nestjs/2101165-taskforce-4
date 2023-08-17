import { City } from "@project/shared/app-types";

export class CreateTaskDto {
  public name: string;
  public description: string;
  public price?: number;
  public address?: string;
  public city: City;
  public userId: string;
  public category: number[];
  public tags?: string[];
  public tillDate?: Date;
  public image?: string;
}
