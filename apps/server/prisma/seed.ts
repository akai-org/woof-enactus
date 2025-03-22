import { PrismaClient, Prisma } from "@prisma/client";
import { faker, fakerPL } from "@faker-js/faker";

const prisma = new PrismaClient();

// Insert 1000 records for testing
async function main() {
  await prisma.workingHours.deleteMany();
  await prisma.partnerProfile.deleteMany();
  await prisma.partner.deleteMany();

  await prisma.$executeRaw`ALTER SEQUENCE "Partner_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "PartnerProfile_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "WorkingHours_id_seq" RESTART WITH 1;`;

  const partnersData: Prisma.PartnerCreateManyInput[] = [];
  for (let i = 0; i < 1000; i++) {
    partnersData.push({
      name: faker.company.name(),
      type: faker.helpers.arrayElement(["VET", "ORG", "SHOP", "SHELTER"]),
      latitude: faker.location.latitude({ min: 50, max: 54, precision: 5 }),
      longitude: faker.location.longitude({ min: 15, max: 23, precision: 5 }),
    });
  }

  const resultPartners = await prisma.partner.createMany({
    data: partnersData,
  });

  const profilesData: Prisma.PartnerProfileCreateManyInput[] = [];
  const hoursData: Prisma.WorkingHoursCreateManyInput[] = [];
  for (let i = 0; i < 1000; i++) {
    profilesData.push({
      partnerId: i + 1,
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
    hoursData.push({
      profileId: i + 1,
      monday: "8:00 - 15:00",
      tuesday: "8:00 - 15:00",
      wednesday: "8:00 - 15:00",
      thursday: "8:00 - 15:00",
      friday: "8:00 - 15:00",
      saturday: "Zamknięte",
      sunday: "Zamknięte",
    });
  }

  const resultProfiles = await prisma.partnerProfile.createMany({
    data: profilesData,
  });

  const resultHours = await prisma.workingHours.createMany({
    data: hoursData,
  });

  console.log(`Inserted ${resultPartners.count} partners`);
  console.log(`Inserted ${resultProfiles.count} profiles`);
  console.log(`Inserted ${resultHours.count} working hours`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
