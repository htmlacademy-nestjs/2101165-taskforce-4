import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskUserModel, TaskUserSchema } from './task-user.model';
import { TaskUserMongoRepository } from './task-user-mongo.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TaskUserModel.name, schema: TaskUserSchema }
  ])],
  providers: [TaskUserMongoRepository],
  exports: [TaskUserMongoRepository]
})
export class TaskUserModule {}
