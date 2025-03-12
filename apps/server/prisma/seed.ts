import { PrismaClient, Prisma } from "@prisma/client";
import { faker, fakerPL } from "@faker-js/faker";

const prisma = new PrismaClient();

// Insert 1000 records to test
async function main() {
  const partnersData: Prisma.PartnerCreateManyInput[] = [];
  const profilesData: Prisma.PartnerProfileCreateManyInput[] = [];

  for (let i = 0; i < 1000; i++) {
    partnersData.push({
      id: i,
      name: faker.company.name(),
      type: faker.helpers.arrayElement(["VET", "ORG", "SHOP", "SHELTER"]),
    });
    profilesData.push({
      partnerId: i,
      animals: faker.helpers.arrayElements(["Dogs", "Cats", "Parrots"], {
        min: 1,
        max: 3,
      }),
      city: fakerPL.location.city(),
      street: fakerPL.location.street(),
      getToInfo: "Jakieś tam instrukcje dojazdu...",
      postal: fakerPL.location.zipCode("##-###"),
      description: fakerPL.lorem.paragraph(),
      visitHours: "Pon-Pt 10:30 - 14:00",
      phone: fakerPL.phone.number(),
      website: faker.internet.url(),
    });
  }

  const resultPartners = await prisma.partner.createMany({
    data: partnersData,
  });

  const resultProfiles = await prisma.partnerProfile.createMany({
    data: profilesData,
  });

  console.log(`Inserted ${resultPartners.count} partners`);
  console.log(`Inserted ${resultProfiles.count} profiles`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
