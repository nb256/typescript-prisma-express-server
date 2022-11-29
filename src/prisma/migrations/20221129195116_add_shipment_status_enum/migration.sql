-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('1', '2', '3', '4');

-- AlterTable
ALTER TABLE "packages" ADD COLUMN     "status" "ShipmentStatus" NOT NULL DEFAULT '1';
