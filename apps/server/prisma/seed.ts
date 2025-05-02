import { PrismaClient, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { faker, fakerPL } from "@faker-js/faker";
import slugify from "slugify";

const prisma = new PrismaClient({
  datasourceUrl:
    "postgresql://enactus:zaq1@WSX@localhost:5432/woof?schema=public",
});

async function main(): Promise<void> {
  console.log("[SEED] Clearing database...");
  await prisma.neededGoodsMeta.deleteMany();
  await prisma.neededGoods.deleteMany();
  await prisma.workingHours.deleteMany();
  await prisma.partnerProfile.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.partnerAccount.deleteMany();

  await prisma.$executeRaw`ALTER SEQUENCE "PartnerEvent_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Partner_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "PartnerProfile_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "WorkingHours_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "NeededGoodsMeta_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "NeededGoods_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "WorkingHours_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "PartnerProfile_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Partner_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "PartnerAccount_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "PartnerEvent_id_seq" RESTART WITH 1;`;

  console.log("[SEED] Generating data...");
  const partnerAccountPayload: Prisma.PartnerAccountCreateManyInput[] = [];
  const partnerPayload: Prisma.PartnerCreateManyInput[] = [];
  const partnerProfilePayload: Prisma.PartnerProfileCreateManyInput[] = [];
  const workingHoursPayload: Prisma.WorkingHoursCreateManyInput[] = [];
  const neededGoodsPayload: Prisma.NeededGoodsCreateManyInput[] = [];
  const neededGoodsMetaPayload: Prisma.NeededGoodsMetaCreateManyInput[] = [];
  const partnerEventPayload: Prisma.PartnerEventCreateManyInput[] = [];

  for (let i = 0; i < 1000; i++) {
    partnerAccountPayload.push({
      username: `user${i}`,
      password: await bcrypt.hash("zaq1@WSX", 6),
    });

    partnerPayload.push({
      name: fakerPL.company.name(),
      slug: `temp-${i}`,
      latitude: faker.location.latitude({ min: 50, max: 54, precision: 5 }),
      longitude: faker.location.longitude({ min: 15, max: 23, precision: 5 }),
      type: faker.helpers.arrayElement(["VET", "ORG", "SHOP", "SHELTER"]),
      accountId: i + 1,
    });

    partnerProfilePayload.push({
      partnerId: i + 1,
      description: fakerPL.lorem.lines(2),
      getToInfo: "przykładkowe instrukcje dojazdu...",
      city: fakerPL.location.city(),
      street: fakerPL.location.street(),
      postal: fakerPL.location.zipCode("##-###"),
      website: fakerPL.internet.url(),
      animals: faker.helpers.arrayElements(["Dogs", "Cats", "Parrots"], {
        min: 1,
        max: 3,
      }),
      visitHours: "Pon - Pt, 10:00 - 14:30",
      phone: fakerPL.phone.number(),
      email: fakerPL.internet.email(),
      image: faker.image.urlPicsumPhotos({
        grayscale: false,
        blur: 0,
        width: 600,
        height: 400,
      }),
    });

    workingHoursPayload.push({
      profileId: i + 1,
      monday: "8:00 - 15:00",
      tuesday: "8:00 - 15:00",
      wednesday: "8:00 - 15:00",
      thursday: "8:00 - 15:00",
      friday: "8:00 - 15:00",
      saturday: "Zamknięte",
      sunday: "Zamknięte",
    });

    neededGoodsPayload.push({
      partnerId: i + 1,
      name: fakerPL.lorem.words({ min: 1, max: 4 }),
      amountCurrent: 0,
      amountMax: faker.number.int({ min: 0, max: 100 }),
      amountUnit: faker.helpers.arrayElement(["sztuki", "litry"]),
      state: "LOW",
      stateInfo: 'Jakis tam stan typu "Potrzebne pilnie", etc.',
    });

    neededGoodsMetaPayload.push({
      partnerId: i + 1,
      note: fakerPL.lorem.paragraph(),
    });

    partnerEventPayload.push({
      partnerId: i + 1,
      title: fakerPL.lorem.words({ min: 2, max: 3 }),
      description: fakerPL.lorem.paragraph(),
      thumbnail: fakerPL.image.avatar(),
    });
  }

  await prisma.partnerAccount.createMany({
    data: partnerAccountPayload,
  });

  const createdPartners = await prisma.partner.createManyAndReturn({
    data: partnerPayload,
  });

  await prisma.partnerProfile.createMany({
    data: partnerProfilePayload,
  });

  await prisma.workingHours.createMany({
    data: workingHoursPayload,
  });

  await prisma.neededGoods.createMany({
    data: neededGoodsPayload,
  });

  await prisma.neededGoodsMeta.createMany({
    data: neededGoodsMetaPayload,
  });

  await prisma.partnerEvent.createMany({
    data: partnerEventPayload,
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  createdPartners.forEach(async partner => {
    const generatedSlug = `${slugify(partner.name, { lower: true })}-${partner.id}`;
    await prisma.partner.update({
      where: {
        id: partner.id,
      },
      data: {
        slug: generatedSlug,
      },
    });
  });
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
