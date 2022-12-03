-- CreateEnum
CREATE TYPE "FailedShipmentReason" AS ENUM ('INVALID_BARCODE', 'WRONG_DELIVERY_POINT', 'INVALID_DELIVERY_POINT');

-- CreateTable
CREATE TABLE "failed_shipments" (
    "id" SERIAL NOT NULL,
    "barcode" TEXT NOT NULL,
    "toDeliveryPointValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" "FailedShipmentReason" NOT NULL,

    CONSTRAINT "failed_shipments_pkey" PRIMARY KEY ("id")
);