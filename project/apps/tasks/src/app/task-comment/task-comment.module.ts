import { TaskPostModule } from './../task-post/task-post.module';
import { PrismaModule } from './../prisma/prisma.module';
import { TaskCommentRepository } from './task-comment.repository';
import { TaskCommentService } from './task-comment.service';
import { Module } from '@nestjs/common';
import { CommentController } from './task-comment.controller';

@Module({
  imports: [PrismaModule, TaskPostModule],
  controllers: [CommentController],
  providers: [TaskCommentService, TaskCommentRepository],
  exports: [TaskCommentService],
})
export class TaskCommentModule {}
