import { FailedShipmentReason, Sack, ShipmentStatus } from "@prisma/client";

import isSackUnloadable from "../functions/isSackUnloadable";
import findSack from "./findSack";
import prisma from "../database";
import createFailedShipment from "./createFailedShipment";

export default async function unloadSackAndItsPackages(
  barcode: string,
  toDeliveryPoint: number
): Promise<Sack | null> {
  const sackToUnload = await findSack(barcode);

  if (sackToUnload && isSackUnloadable(sackToUnload, toDeliveryPoint)) {
    return prisma.sack.update({
      where: { barcode },
      data: {
        status: ShipmentStatus["UNLOADED"],
        packages: {
          updateMany: {
            where: {
              status: ShipmentStatus["LOADED_INTO_SACK"],
            },
            data: {
              status: ShipmentStatus["UNLOADED"],
            },
          },
        },
      },
    });
  }

  await createFailedShipment(
    barcode,
    toDeliveryPoint,
    FailedShipmentReason["WRONG_DELIVERY_POINT"]
  );

  return sackToUnload;
}
