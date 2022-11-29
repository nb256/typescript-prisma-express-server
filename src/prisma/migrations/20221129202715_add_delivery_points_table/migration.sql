-- CreateTable
CREATE TABLE "delivery_points" (
    "value" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "delivery_points_pkey" PRIMARY KEY ("value")
);

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_toDeliveryPointValue_fkey" FOREIGN KEY ("toDeliveryPointValue") REFERENCES "delivery_points"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
