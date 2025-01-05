/*
  Warnings:

  - A unique constraint covering the columns `[playerId,question]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Answer_playerId_question_key" ON "Answer"("playerId", "question");
