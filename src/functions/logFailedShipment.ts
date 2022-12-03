import { FailedShipmentReason, FailedShipment } from "@prisma/client";
import createFailedShipment from "../database/createFailedShipment";

export default async function logFailedShipment(
  barcode: string,
  toDeliveryPointValue: number,
  reason: FailedShipmentReason
): Promise<FailedShipment> {
  return createFailedShipment(barcode, toDeliveryPointValue, reason);
}
