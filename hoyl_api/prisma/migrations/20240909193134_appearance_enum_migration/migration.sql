/*
  Warnings:

  - Changed the type of `apperance` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Appearance" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "apperance",
ADD COLUMN     "apperance" "Appearance" NOT NULL;
