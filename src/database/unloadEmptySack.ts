import { Package, Sack } from "@prisma/client";

import prisma from "../database";

export default async function unloadEmptySack(
  sack: (Sack & { packages: Package[] }) | null
): Promise<void> {
  if (sack) {
    const allPackagesAreUnloaded = sack.packages.every(
      (pkg) => pkg.status === "UNLOADED"
    );

    if (allPackagesAreUnloaded) {
      await prisma.sack.update({
        where: {
          barcode: sack.barcode,
        },
        data: {
          status: "UNLOADED",
        },
      });
    }
  }
}
