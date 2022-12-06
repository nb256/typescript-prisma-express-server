import { DeliveryPoint, Package, Sack } from "@prisma/client";
import prisma from "../database";

export default function findPackageWithSackDetails(barcode: string): Promise<
  | (Package & {
      toDeliveryPoint: DeliveryPoint;
      sack:
        | (Sack & { toDeliveryPoint: DeliveryPoint; packages: Package[] })
        | null;
    })
  | null
> {
  return prisma.package.findUnique({
    where: {
      barcode,
    },
    include: {
      toDeliveryPoint: true,
      sack: {
        include: {
          toDeliveryPoint: true,
          packages: true,
        },
      },
    },
  });
}
