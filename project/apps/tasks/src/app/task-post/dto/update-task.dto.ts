import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MinDate } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateTaskDto {
  @ApiProperty({
    description:'Task tittle',
    example: 'Положить ламинат',
  })
  @IsString()
  @IsOptional()
  public title: string;

  @ApiProperty({
    description:'Описание задачи',
    example: 'Нужно сменить некрасивый линолеум на этот замечательный ламинат.',
  })
  @IsString()
  @IsOptional()
  public description: string;

  @ApiProperty({
    description:'Стоимость задачи',
    example: '1000',
  })
  @IsNumber()
  @IsOptional()
  public price: number;

  @ApiProperty({
    description:'Address',
    example: 'ул. Садовая, д. 5',
  })
  @IsString()
  @IsOptional()
  public address?: string;

  @ApiProperty({
    description:'City',
    example: 'Москва',
  })
  @IsString()
  @IsOptional()
  public city: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '64d0bfd7439a6b47c9903215'
  })
  @IsString()
  @IsOptional()
  public userId: string;

  @ApiProperty({
    description: 'Task category id',
    example: '1',
  })
  public category: number[];

  @ApiProperty({
    description: 'Task tags',
    example: 'срочно',
  })
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'Task dedline',
    example: '16.08.2023',
  })
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  @IsOptional()
  public tillDate?: string;

  @ApiProperty({
    description: 'Task image',
    example: 'example.jpg',
  })
  @IsOptional()
  public image?: string;
}
