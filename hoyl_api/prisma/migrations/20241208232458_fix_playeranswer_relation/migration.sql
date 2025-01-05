-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_playerUsername_fkey";

-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "playerUsername" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_playerUsername_fkey" FOREIGN KEY ("playerUsername") REFERENCES "Player"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
