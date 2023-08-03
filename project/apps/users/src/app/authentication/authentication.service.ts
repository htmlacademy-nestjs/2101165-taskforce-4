import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TaskUserMemoryRepository } from '../task-user/task-user-memory.repository';
import dayjs from 'dayjs';
import { AuthAnswers } from './authentication.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly taskUserRepository: TaskUserMemoryRepository
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, firstname, lastname, password, dateBirth, role, city, avatar} = dto;

    const taskUser = {
      email, firstname, lastname, role, city,
      avatar, dateBirth: dayjs(dateBirth).toDate(),
      passwordHash: ''
    };

    const existUser = await this.taskUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthAnswers.AUTH_USER_EXISTS);
    }

    const userEntity = await new TaskUserEntity(taskUser)
      .setPassword(password)

    return this.taskUserRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.taskUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthAnswers.AUTH_USER_NOT_FOUND);
    }

    const blogUserEntity = new TaskUserEntity(existUser);
    if (!await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthAnswers.AUTH_USER_PASSWORD_WRONG);
    }

    return blogUserEntity.toObject();
  }

  public async getUser(id: string) {
    return this.taskUserRepository.findById(id);
  }
}