-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "comments_count" INTEGER DEFAULT 0,
ADD COLUMN     "executor_id" TEXT DEFAULT '',
ADD COLUMN     "responses_count" INTEGER DEFAULT 0,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'New';

-- CreateTable
CREATE TABLE "responses" (
    "response_id" SERIAL NOT NULL,
    "offerPrice" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "executor_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("response_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "executor_id" TEXT NOT NULL,
    "review" TEXT NOT NULL DEFAULT '',
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
