import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateCategoryDto {
  @ApiProperty({
    description:'New category tittle',
    example: 'Починка',
  })
  @IsString()
  public title: string;
}
