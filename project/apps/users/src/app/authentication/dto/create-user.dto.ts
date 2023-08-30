import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@project/shared/app-types";
import { IsEmail, IsISO8601, IsString } from 'class-validator';
import { AuthAnswers } from "../authentication.constant";

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthAnswers.AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1870-22-04',
  })
  @IsISO8601({}, { message: AuthAnswers.AUTH_USER_DATE_BIRTH_NOT_VALID })
  public dateBirth: string;

  @ApiProperty({
    description:'User city',
    example: 'Moscow',
  })
  @IsString()
  public city: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Vladimir',
  })
  @IsString()
  public firstname: string;

  @ApiProperty({
    description:'User last name',
    example: 'Lenin',
  })
  @IsString()
  public lastname: string;

  @ApiProperty({
    description:'User avatar',
    example: '/images/user.png',
  })
  @IsString()
  public avatar: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty123456',
  })
  @IsString()
  public password: string;

  @ApiProperty({
    description: 'User role',
    example: 'customer'
  })
  @IsString()
  public role: UserRole;
}
