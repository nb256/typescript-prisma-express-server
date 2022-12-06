import { FailedShipmentReason, Package, ShipmentStatus } from "@prisma/client";
import prisma from "../database";
import createFailedShipment from "./createFailedShipment";
import findPackageWithSackDetails from "./findPackageWithSackDetails";

export default async function loadPackage(
  barcode: string
): Promise<Package | false> {
  const packageToLoad = await findPackageWithSackDetails(barcode);

  if (
    packageToLoad &&
    (!packageToLoad.sack ||
      (packageToLoad.sack &&
        packageToLoad.sack.toDeliveryPointValue !==
          packageToLoad.toDeliveryPointValue))
  ) {
    return prisma.package.update({
      where: {
        barcode,
      },
      data: {
        status: ShipmentStatus["LOADED"],
      },
    });
  }

  if (
    packageToLoad &&
    packageToLoad.sack &&
    packageToLoad.sack.toDeliveryPointValue ===
      packageToLoad.toDeliveryPointValue
  ) {
    return prisma.package.update({
      where: {
        barcode,
      },
      data: {
        status: ShipmentStatus["LOADED_INTO_SACK"],
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
