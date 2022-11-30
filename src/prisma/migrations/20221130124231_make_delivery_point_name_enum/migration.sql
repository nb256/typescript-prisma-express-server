/*
  Warnings:

  - Changed the type of `name` on the `delivery_points` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeliveryPointType" AS ENUM ('Branch', 'Distribution Centre', 'Transfer Centre');

-- AlterTable
ALTER TABLE "delivery_points" DROP COLUMN "name",
ADD COLUMN     "name" "DeliveryPointType" NOT NULL;
