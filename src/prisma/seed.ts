/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import prisma from "../database";

const deliveryPoints = [
  {
    value: 1,
    name: "Branch",
  },
  {
    value: 2,
    name: "Distribution Centre",
  },
  {
    value: 3,
    name: "Transfer Centre",
  },
];

async function main() {
  for (const deliveryPoint of deliveryPoints) {
    await prisma.deliveryPoint.upsert({
      where: { value: deliveryPoint.value },
      update: {},
      create: deliveryPoint,
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
