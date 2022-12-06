import { ShipmentStatus } from "@prisma/client";

export default function getValueFromStatus(status: ShipmentStatus): number {
  switch (status) {
    case ShipmentStatus["CREATED"]:
      return 1;
    case ShipmentStatus["LOADED_INTO_SACK"]:
      return 2;
    case ShipmentStatus["LOADED"]:
      return 3;
    case ShipmentStatus["UNLOADED"]:
      return 4;
    default:
      return 0;
  }
}
