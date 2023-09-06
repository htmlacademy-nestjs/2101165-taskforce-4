import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TagRdo {
  @ApiProperty({
    description: 'The uniq tag ID',
    example: '1',
    required: true,
  })
  @Expose()
  public tagId: string;

  @ApiProperty({
    description: 'The tag title',
    example: 'fix',
    required: true,
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Task ID',
    example: '1',
    required: true,
  })
  @Expose()
  public taskId: string;
}