import {
  FailedShipmentReason,
  Package,
  Sack,
  ShipmentStatus,
} from "@prisma/client";

import isPackageUnloadable from "../functions/isPackageUnloadable";
import prisma from "../database";
import findPackageWithSackDetails from "./findPackageWithSackDetails";
import createFailedShipment from "./createFailedShipment";

export default async function unloadPackage(
  barcode: string,
  toDeliveryPoint: number
): Promise<
  | (Package & {
      sack:
        | (Sack & {
            packages: Package[];
          })
        | null;
    })
  | null
> {
  const packageToUnload = await findPackageWithSackDetails(barcode);

  if (
    packageToUnload &&
    isPackageUnloadable(packageToUnload, toDeliveryPoint)
  ) {
    return prisma.package.update({
      where: { barcode },
      data: {
        status: ShipmentStatus["UNLOADED"],
      },
      include: {
        sack: {
          include: {
            packages: true,
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

  return packageToUnload;
}
