import {
  DeliveryPoint,
  DeliveryPointType,
  Package,
  ShipmentStatus,
} from "@prisma/client";

export default function isPackageUnloadable(
  shipment: Package & { toDeliveryPoint: DeliveryPoint },
  toDeliveryPointValue: number
): boolean {
  if (
    shipment.status !== ShipmentStatus["LOADED_INTO_SACK"] &&
    shipment.status !== ShipmentStatus["LOADED"]
  ) {
    return false;
  }

  if (
    shipment.toDeliveryPoint.name === DeliveryPointType["BRANCH"] &&
    shipment.status === ShipmentStatus["LOADED_INTO_SACK"]
  ) {
    return false;
  } else if (
    shipment.toDeliveryPoint.name === DeliveryPointType["BRANCH"] &&
    shipment.toDeliveryPointValue === toDeliveryPointValue
  ) {
    return true;
  } else if (
    shipment.toDeliveryPoint.name ===
      DeliveryPointType["DISTRIBUTION_CENTRE"] &&
    shipment.toDeliveryPointValue === toDeliveryPointValue
  ) {
    return true;
  } else if (
    shipment.toDeliveryPoint.name === DeliveryPointType["TRANSFER_CENTRE"] &&
    shipment.status === ShipmentStatus["LOADED_INTO_SACK"] &&
    shipment.toDeliveryPointValue === toDeliveryPointValue
  ) {
    return true;
  }
  return false;
}
