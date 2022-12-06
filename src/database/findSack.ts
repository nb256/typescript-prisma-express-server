import { DeliveryPoint, Sack } from "@prisma/client";
import prisma from "../database";

export default function findSack(
  barcode: string
): Promise<(Sack & { toDeliveryPoint: DeliveryPoint }) | null> {
  return prisma.sack.findUnique({
    where: {
      barcode,
    },
    include: {
      toDeliveryPoint: true,
    },
  });
}
