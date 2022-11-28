-- CreateTable
CREATE TABLE "packages" (
    "barcode" TEXT NOT NULL,
    "toDeliveryPointValue" INTEGER NOT NULL,
    "desi" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("barcode")
);
