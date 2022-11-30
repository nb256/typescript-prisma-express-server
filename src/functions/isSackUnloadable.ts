import {
  DeliveryPoint,
  DeliveryPointType,
  Sack,
  ShipmentStatus,
} from "@prisma/client";

export default function isSackUnloadable(
  shipment: Sack & { toDeliveryPoint: DeliveryPoint },
  toDeliveryPointValue: number
): boolean {
  if (
    shipment.status !== ShipmentStatus["LOADED"] ||
    shipment.toDeliveryPoint.name === DeliveryPointType["BRANCH"]
  ) {
    return false;
  }

  if (shipment.toDeliveryPointValue === toDeliveryPointValue) {
    return true;
  }
  return false;
}
