import { TaskReviewRepository } from './task-review.repository';
import { TaskReviewService } from './task-review.service';
import { Module } from '@nestjs/common';
import { TaskReviewController } from './task-review.controller';

@Module({
  imports: [],
  controllers: [
    TaskReviewController
  ],
  providers: [
    TaskReviewService, 
    TaskReviewRepository
  ],
  exports: [
    TaskReviewRepository
  ]
})
export class TaskReviewModule {}
