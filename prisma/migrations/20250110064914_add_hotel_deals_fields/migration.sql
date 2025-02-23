-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "discountPercentage" DOUBLE PRECISION,
ADD COLUMN     "discountedPrice" DOUBLE PRECISION,
ADD COLUMN     "validUntil" TIMESTAMP(3);
