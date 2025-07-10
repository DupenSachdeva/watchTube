/*
  Warnings:

  - You are about to drop the column `channelDescription` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Channel` table. All the data in the column will be lost.
  - Made the column `channelId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_channelId_fkey";

-- DropIndex
DROP INDEX "Channel_id_userId_key";

-- DropIndex
DROP INDEX "Channel_userId_key";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "channelDescription",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "channelId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
