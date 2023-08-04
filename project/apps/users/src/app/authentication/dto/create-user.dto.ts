import { ApiProperty } from "@nestjs/swagger";
import { City, UserRole } from "@project/shared/app-types";

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1870-22-04'
  })
  public dateBirth: string;

  @ApiProperty({
    description:'User city',
    example: 'Moscow'
  })
  public city: City;

  @ApiProperty({
    description: 'User first name',
    example: 'Vladimir'
  })
  public firstname: string;

  @ApiProperty({
    description:'User last name',
    example: 'Lenin'
  })
  public lastname: string;

  @ApiProperty({
    description:'User avatar',
    example: '/images/user.png'
  })
  public avatar: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty123456'
  })
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'customer'
  })
  public role: UserRole;
}