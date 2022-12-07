/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { DeliveryPointType } from "@prisma/client";
import prisma from "../database";

const deliveryPoints = [
  {
    value: 1,
    name: DeliveryPointType["BRANCH"],
  },
  {
    value: 2,
    name: DeliveryPointType["DISTRIBUTION_CENTRE"],
  },
  {
    value: 3,
    name: DeliveryPointType["TRANSFER_CENTRE"],
  },
];

const packages = [
  { barcode: "P7988000121", toDeliveryPointValue: 1, desi: 5 },
  { barcode: "P7988000122", toDeliveryPointValue: 1, desi: 5 },
  { barcode: "P7988000123", toDeliveryPointValue: 1, desi: 9 },
  { barcode: "P8988000120", toDeliveryPointValue: 2, desi: 33 },
  { barcode: "P8988000121", toDeliveryPointValue: 2, desi: 17 },
  { barcode: "P8988000123", toDeliveryPointValue: 2, desi: 35 },
  { barcode: "P8988000124", toDeliveryPointValue: 2, desi: 1 },
  { barcode: "P8988000125", toDeliveryPointValue: 2, desi: 200 },
  { barcode: "P9988000126", toDeliveryPointValue: 3, desi: 15 },
  { barcode: "P9988000127", toDeliveryPointValue: 3, desi: 16 },
  { barcode: "P9988000130", toDeliveryPointValue: 3, desi: 17 },
  { barcode: "P8988000122", toDeliveryPointValue: 2, desi: 26 },
  { barcode: "P8988000126", toDeliveryPointValue: 2, desi: 50 },
  { barcode: "P9988000128", toDeliveryPointValue: 3, desi: 55 },
  { barcode: "P9988000129", toDeliveryPointValue: 3, desi: 28 },
];

const sacks = [
  {
    barcode: "C725799",
    toDeliveryPointValue: 2,
    packages: {
      connect: [{ barcode: "P8988000122" }, { barcode: "P8988000126" }],
    },
  },
  {
    barcode: "C725800",
    toDeliveryPointValue: 3,
    packages: {
      connect: [{ barcode: "P9988000128" }, { barcode: "P9988000129" }],
    },
  },
];

export async function main() {
  for (const deliveryPoint of deliveryPoints) {
    await prisma.deliveryPoint.upsert({
      where: { value: deliveryPoint.value },
      update: {},
      create: deliveryPoint,
    });
  }

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { barcode: pkg.barcode },
      update: {},
      create: pkg,
    });
  }

  for (const sack of sacks) {
    await prisma.sack.upsert({
      where: { barcode: sack.barcode },
      update: {},
      create: sack,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export async function removeSeeds() {
  await prisma.package.deleteMany({
    where: {
      barcode: {
        in: packages.map((pkg) => pkg.barcode),
      },
    },
  });

  await prisma.sack.deleteMany({
    where: {
      barcode: {
        in: sacks.map((sack) => sack.barcode),
      },
    },
  });

  await prisma.failedShipment.deleteMany({
    where: {
      barcode: {
        in: [...packages, ...sacks].map((item) => item.barcode),
      },
    },
  });

  await prisma.deliveryPoint.deleteMany({
    where: {
      value: {
        in: deliveryPoints.map((deliveryPoint) => deliveryPoint.value),
      },
    },
  });
}
