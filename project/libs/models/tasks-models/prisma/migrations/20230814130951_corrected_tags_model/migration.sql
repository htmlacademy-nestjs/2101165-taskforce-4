/*
  Warnings:

  - You are about to drop the column `user_id` on the `tags` table. All the data in the column will be lost.
  - Added the required column `title` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "user_id",
ADD COLUMN     "title" TEXT NOT NULL;
