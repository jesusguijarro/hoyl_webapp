/*
  Warnings:

  - You are about to drop the column `playerId` on the `Answer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerUsername,question]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playerUsername` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_playerId_fkey";

-- DropIndex
DROP INDEX "Answer_playerId_question_key";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "playerId",
ADD COLUMN     "playerUsername" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Answer_playerUsername_question_key" ON "Answer"("playerUsername", "question");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_playerUsername_fkey" FOREIGN KEY ("playerUsername") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
