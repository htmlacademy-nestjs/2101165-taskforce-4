import { Module } from "@nestjs/common";

import { TaskCategoryModule } from "../task-category/task-category.module";
import { TaskPostController } from "./task-post.controller";
import { TaskPostMemoryRepository } from "./task-post-memory.repository";
import { TaskPostService } from "./task-post.service";


@Module({
  imports: [TaskCategoryModule],
  controllers: [TaskPostController],
  providers: [TaskPostService, TaskPostMemoryRepository],
})
export class TaskPostModule {}
