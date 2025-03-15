import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Insert 1000 records to test
async function main() {
  const partnersData: Prisma.PartnerCreateManyInput[] = [];

  for (let i = 0; i < 1000; i++) {
    partnersData.push({
      name: faker.company.name(),
      city: faker.location.city(),
      street: faker.location.streetAddress(),
      postal: faker.location.zipCode(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      type: faker.helpers.arrayElement(["VET", "ORG", "SHOP", "SHELTER"]),
    });
  }

  const result = await prisma.partner.createMany({
    data: partnersData,
  });

  console.log(`Inserted ${result.count} partners`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
