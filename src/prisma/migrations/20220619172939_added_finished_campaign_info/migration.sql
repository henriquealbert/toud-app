-- AlterTable
ALTER TABLE "campaign" ADD COLUMN     "clicks" INTEGER,
ADD COLUMN     "cpc" DECIMAL(18,2),
ADD COLUMN     "cpm" DECIMAL(18,2),
ADD COLUMN     "ctr" DECIMAL(18,2),
ADD COLUMN     "display_time" TEXT,
ADD COLUMN     "total_reach" DECIMAL(18,2);
