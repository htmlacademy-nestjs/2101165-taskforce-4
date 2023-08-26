/*
  Warnings:

  - The `till_date` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_categoryId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "till_date",
ADD COLUMN     "till_date" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "_CategoryToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToTask_AB_unique" ON "_CategoryToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToTask_B_index" ON "_CategoryToTask"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToTask" ADD CONSTRAINT "_CategoryToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTask" ADD CONSTRAINT "_CategoryToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
