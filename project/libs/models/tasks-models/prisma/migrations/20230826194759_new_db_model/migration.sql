/*
  Warnings:

  - You are about to drop the column `categoryId` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `published_at` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "categoryId",
ADD COLUMN     "published_at" TIMESTAMP(3) NOT NULL;
