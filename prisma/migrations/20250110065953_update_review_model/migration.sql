/*
  Warnings:

  - A unique constraint covering the columns `[userId,tourId,hotelId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "hotelId" TEXT,
ALTER COLUMN "tourId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "features" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_tourId_hotelId_key" ON "Review"("userId", "tourId", "hotelId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
