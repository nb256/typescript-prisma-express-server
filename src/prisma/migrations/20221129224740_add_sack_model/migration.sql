-- AlterTable
ALTER TABLE "packages" ADD COLUMN     "sackBarcode" TEXT;

-- CreateTable
CREATE TABLE "sacks" (
    "barcode" TEXT NOT NULL,
    "toDeliveryPointValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ShipmentStatus" NOT NULL DEFAULT '1',

    CONSTRAINT "sacks_pkey" PRIMARY KEY ("barcode")
);

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_sackBarcode_fkey" FOREIGN KEY ("sackBarcode") REFERENCES "sacks"("barcode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sacks" ADD CONSTRAINT "sacks_toDeliveryPointValue_fkey" FOREIGN KEY ("toDeliveryPointValue") REFERENCES "delivery_points"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
