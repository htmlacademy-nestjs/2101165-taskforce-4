export class CreateTaskDto {
  public title: string;
  public description: string;
  public price: number;
  public address?: string;
  public city: string;
  public userId: string;
  public category: number[];
  public tags?: string[];
  public tillDate?: string;
  public image?: string;
}
