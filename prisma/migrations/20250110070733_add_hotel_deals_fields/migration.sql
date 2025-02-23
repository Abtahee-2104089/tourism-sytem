-- AlterTable
ALTER TABLE "Hotel" ALTER COLUMN "amenities" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Tour" ALTER COLUMN "features" SET DEFAULT ARRAY[]::TEXT[];
