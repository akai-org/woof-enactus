import * as ExcelJS from "exceljs";
import { PrismaClient, Prisma, PartnerType, $Enums } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { faker, fakerPL } from "@faker-js/faker";
import slugify from "slugify";
import { setTimeout } from "node:timers/promises";

const parseAnimal = (animals: string): string[] => {
  const entries = animals.split(", ");
  return entries;
};

const parseOrgType = (type: string): PartnerType => {
  switch (type) {
    case "Schronisko":
      return "SHELTER";
    case "Fundacja":
      return "ORG";
    case "Organizacja":
      return "ORG";
  }
  return "SHOP";
};

const prisma = new PrismaClient();

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

  console.log("[SEED] Generating data...");
  const partnerAccountPayload: Prisma.PartnerAccountCreateManyInput[] = [];
  const partnerPayload: Prisma.PartnerCreateManyInput[] = [];
  const partnerProfilePayload: Prisma.PartnerProfileCreateManyInput[] = [];
  const workingHoursPayload: Prisma.WorkingHoursCreateManyInput[] = [];
  const neededGoodsPayload: Prisma.NeededGoodsCreateManyInput[] = [];
  const neededGoodsMetaPayload: Prisma.NeededGoodsMetaCreateManyInput[] = [];
  const partnerEventPayload: Prisma.PartnerEventCreateManyInput[] = [];

  const filePath = process.argv[2];
  if (filePath) {
    const workbook = new ExcelJS.Workbook();
    const workbookData = await workbook.xlsx.readFile(filePath);

    const partnerSheet = workbookData.worksheets[0];
    const eventsSheet = workbookData.worksheets[1];
    const goodsSheet = workbookData.worksheets[2];

    const partnerRows = partnerSheet.getRows(2, 27);
    const eventsRows = eventsSheet.getRows(2, 9);
    const goodsRows = goodsSheet.getRows(2, 185);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    partnerRows?.forEach(async row => {
      if (row.getCell(1).text) {
        const i = parseInt(row.getCell(1).text);

        partnerAccountPayload.push({
          id: i,
          username: `partner-${i}`,
          password: await bcrypt.hash("zaq1@WSX", 6),
        });

        partnerPayload.push({
          id: i,
          name: row.getCell(2).text,
          slug: `temp-${i}`,
          latitude: parseFloat(row.getCell(4).text.split(", ")[0]),
          longitude: parseFloat(row.getCell(4).text.split(", ")[1]),
          type: parseOrgType(row.getCell(3).text),
        });

        partnerProfilePayload.push({
          id: i,
          partnerId: i,
          description: row.getCell(5).text,
          getToInfo: row.getCell(6).text,
          city: row.getCell(7).text,
          street: row.getCell(8).text,
          postal: row.getCell(9).text,
          website: row.getCell(11).text,
          animals: parseAnimal(row.getCell(12).text),
          visitHours: "Pon - Pt, 8:00 - 16:00",
          phone: row.getCell(10).text,
          email: row.getCell(13).text,
          image: faker.image.urlPicsumPhotos({
            grayscale: false,
            blur: 0,
            width: 600,
            height: 400,
          }),
        });

        workingHoursPayload.push({
          id: i,
          profileId: i,
          monday: "8:00 - 15:00",
          tuesday: "8:00 - 15:00",
          wednesday: "8:00 - 15:00",
          thursday: "8:00 - 15:00",
          friday: "8:00 - 15:00",
          saturday: "Zamknięte",
          sunday: "Zamknięte",
        });

        neededGoodsMetaPayload.push({
          id: i,
          partnerId: i,
          note: "Bardzo dziękujemy za Waszą pomoc!",
        });
      }
    });

    eventsRows?.forEach(row => {
      if (row.getCell(1).text) {
        partnerEventPayload.push({
          id: parseInt(row.getCell(1).text),
          partnerId: parseInt(row.getCell(3).text),
          title: row.getCell(4).text,
          description: row.getCell(5).text,
          eventDate: row.getCell(6).text,
          thumbnail: row.getCell(7).text ?? null,
        });
      }
    });

    goodsRows?.forEach(row => {
      if (row.getCell(1).text) {
        neededGoodsPayload.push({
          id: parseInt(row.getCell(1).text),
          partnerId: parseInt(row.getCell(3).text),
          name: row.getCell(4).text,
          amountCurrent: parseInt(row.getCell(5).text),
          amountMax: parseInt(row.getCell(6).text),
          amountUnit: row.getCell(7).text,
          state: row.getCell(8).text as $Enums.GoodsState,
          stateInfo: "Customowa informacja o stanie...",
        });
      }
    });
  } else {
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
        eventDate: faker.date.between({ from: "2025-06-01", to: "2025-12-31" }),
      });
    }
  }

  console.log("[SEED] Seeding data...");
  await prisma.partnerAccount.createMany({
    data: partnerAccountPayload,
  });

  await setTimeout(100);

  const createdPartners = await prisma.partner.createManyAndReturn({
    data: partnerPayload,
  });

  await setTimeout(100);

  await prisma.partnerProfile.createMany({
    data: partnerProfilePayload,
  });

  await setTimeout(100);

  await prisma.workingHours.createMany({
    data: workingHoursPayload,
  });

  await setTimeout(100);

  await prisma.partnerEvent.createMany({
    data: partnerEventPayload,
  });

  await setTimeout(100);

  await prisma.neededGoods.createMany({
    data: neededGoodsPayload,
  });

  await setTimeout(100);

  await prisma.neededGoodsMeta.createMany({
    data: neededGoodsMetaPayload,
  });

  await setTimeout(100);

  for (let i = 0; i < createdPartners.length; i++) {
    const generatedSlug = `${slugify(createdPartners[i].name, { lower: true })}-${createdPartners[i].id}`;
    await prisma.partner.update({
      where: {
        id: createdPartners[i].id,
      },
      data: {
        slug: generatedSlug,
      },
    });
  }

  console.log("[SEED] Done!");
}

void main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
