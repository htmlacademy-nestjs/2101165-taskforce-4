import { ApiProperty } from "@nestjs/swagger";
import { City } from "@project/shared/app-types";
import { Expose } from "class-transformer";

export class TaskRdo {
  @ApiProperty({
      description: 'The uniq task ID',
      example: '13'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
      description: 'Task name',
      example: 'Chek my friend bank account'
  })
  @Expose()
  public name: string;

  @ApiProperty({
      description: 'Task description',
      example: 'Get account password'
  })
  @Expose()
  public description: string;

  @ApiProperty({
      description: 'Task category',
      example: 'Cats'
  })
  @Expose()
  public category: string;

  @ApiProperty({
      description: 'Completion reward ',
      example: '100'
  })
  @Expose()
  public price: string;

  @ApiProperty({
      description: 'Task deadline',
      example: '2024-03-12'
  })
  @Expose()
  public tillDate: string;

  @ApiProperty({
      description: 'Task picture',
      example: '/images/task.png'
  })
  @Expose()
  public picture: string;

  @ApiProperty({
      description: 'Job Address',
      example: 'Red square'
  })
  @Expose()
  public address: string;

  @ApiProperty({
      description: 'Task tags',
      example: 'search,dance,squash'
  })
  @Expose()
  public tags: string;

  @ApiProperty({
      description: 'Task city',
      example: 'St. Petersburg'
  })
  @Expose()
  public city: City;

  @ApiProperty({
      description: 'The uniq creator ID',
      example: '13'
  })
  @Expose()
  public userId: string;
}