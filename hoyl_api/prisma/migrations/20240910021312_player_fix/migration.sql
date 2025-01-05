/*
  Warnings:

  - Changed the type of `appearance` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Appearance" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "appearance",
ADD COLUMN     "appearance" "Appearance" NOT NULL;
