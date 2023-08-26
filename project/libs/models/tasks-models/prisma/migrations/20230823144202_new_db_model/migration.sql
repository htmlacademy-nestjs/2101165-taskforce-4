/*
  Warnings:

  - You are about to drop the `_CategoryToTask` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToTask" DROP CONSTRAINT "_CategoryToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTask" DROP CONSTRAINT "_CategoryToTask_B_fkey";

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "categoryId" INTEGER NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CategoryToTask";

-- CreateIndex
CREATE UNIQUE INDEX "categories_title_key" ON "categories"("title");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
