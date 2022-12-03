import { FailedShipment, FailedShipmentReason } from "@prisma/client";
import prisma from "../database";

export default async function createFailedShipment(
  barcode: string,
  toDeliveryPointValue: number,
  reason: FailedShipmentReason
): Promise<FailedShipment> {
  return prisma.failedShipment.create({
    data: {
      barcode,
      toDeliveryPointValue,
      reason,
    },
  });
}
