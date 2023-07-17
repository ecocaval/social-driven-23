/*
  Warnings:

  - You are about to drop the column `authorId` on the `Publication` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_authorId_fkey";

-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "published" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
