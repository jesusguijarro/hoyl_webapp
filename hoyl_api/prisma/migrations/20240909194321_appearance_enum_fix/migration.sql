/*
  Warnings:

  - You are about to drop the column `apperance` on the `Player` table. All the data in the column will be lost.
  - Added the required column `appearance` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "apperance",
ADD COLUMN     "appearance" "Appearance" NOT NULL;
