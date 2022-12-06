import { FailedShipmentReason, Sack, ShipmentStatus } from "@prisma/client";
import prisma from "../database";
import createFailedShipment from "./createFailedShipment";
import findSack from "./findSack";

export default async function loadSackAndItsPackages(
  barcode: string
): Promise<Sack | false> {
  const sack = await findSack(barcode);

  if (sack) {
    return prisma.sack.update({
      where: {
        barcode,
      },
      data: {
        status: ShipmentStatus["LOADED"],
        packages: {
          updateMany: {
            where: {
              status: ShipmentStatus["CREATED"],
            },
            data: {
              status: ShipmentStatus["LOADED_INTO_SACK"],
            },
          },
        },
      },
    });
  }

  await createFailedShipment(
    barcode,
    0,
    FailedShipmentReason["INVALID_BARCODE"]
  );
  return false;
}
