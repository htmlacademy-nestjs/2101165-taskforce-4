import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import dayjs from 'dayjs';
import { AuthAnswers } from './authentication.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TaskUserMongoRepository } from '../task-user/task-user-mongo.repository';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '@project/shared/app-types';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly taskUserRepository: TaskUserMongoRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
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

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }
}
