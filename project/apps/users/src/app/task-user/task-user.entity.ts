import { User, UserRole, City } from '@project/shared/app-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './task-user.constant';

export class TaskUserEntity implements User {
  public _id: string;
  public avatar: string;
  public city: string;
  public dateBirth: Date;
  public email: string;
  public firstname: string;
  public lastname: string;
  public passwordHash: string;
  public role: UserRole;

  constructor(taskUser: User) {
    this.fillEntity(taskUser);
  }

  public toObject() {
    return {
      _id: this._id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      dateBirth: this.dateBirth,
      avatar: this.avatar,
      passwordHash: this.passwordHash,
      role: this.role,
      city: this.city,
    };
  }

  public fillEntity(taskUser: User) {
    this._id = taskUser._id;
    this.avatar = taskUser.avatar;
    this.dateBirth = taskUser.dateBirth;
    this.email = taskUser.email;
    this.firstname = taskUser.firstname;
    this.lastname = taskUser.lastname;
    this.passwordHash = taskUser.passwordHash;
    this.role = taskUser.role;
    this.city = taskUser.city;
  }

  public async setPassword(password: string): Promise<TaskUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
