import * as ExcelJS from "exceljs";
import { PrismaClient, Prisma, PartnerType } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { faker, fakerPL } from "@faker-js/faker";
import slugify from "slugify";
import { setTimeout } from "node:timers/promises";

const parseAddress = (address: string): string[] => {
  const street = address.split(",")[0].trim();
  const postal = address.split(",")[1].split(" ")[0].trim();
  const city = address.split(",")[1].split(" ")[1].trim();
  return [street, postal, city];
};

const parseAnimal = (animals: string): string[] => {
  const out: string[] = [];
  const entries = animals.split(" I ");
  entries.forEach(entry => {
    switch (entry) {
      case "PSY":
        out.push("Psy");
        break;
      case "KOTY":
        out.push("Koty");
        break;
    }
  });
  return out;
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
    const sheet = workbookData.worksheets[0];
    const rows = sheet.getRows(3, 55);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    rows?.forEach(async row => {
      if (row.getCell(1).text != "") {
        const i = parseInt(row.getCell(1).text);
        const address = parseAddress(row.getCell(11).text);

        partnerAccountPayload.push({
          id: i,
          username: `partner-${i}`,
          password: await bcrypt.hash("zaq1@WSX", 6),
        });

        partnerPayload.push({
          id: i,
          name: row.getCell(3).text,
          slug: `temp-${i}`,
          latitude: parseFloat(row.getCell(12).text.split(", ")[0]),
          longitude: parseFloat(row.getCell(12).text.split(", ")[1]),
          type: parseOrgType(row.getCell(2).text),
        });

        partnerProfilePayload.push({
          id: i,
          partnerId: i,
          description: fakerPL.lorem.lines(2),
          getToInfo: "przykładkowe instrukcje dojazdu...",
          city: address[2],
          street: address[0],
          postal: address[1],
          website: row.getCell(5).text,
          animals: parseAnimal(row.getCell(8).text),
          visitHours: "Pon - Pt, 8:00 - 16:00",
          phone: row.getCell(7).text,
          email: row.getCell(6).text,
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

        neededGoodsPayload.push({
          id: i,
          partnerId: i,
          name: fakerPL.lorem.words({ min: 1, max: 4 }),
          amountCurrent: 0,
          amountMax: faker.number.int({ min: 0, max: 100 }),
          amountUnit: faker.helpers.arrayElement(["sztuki", "litry"]),
          state: "LOW",
          stateInfo: 'Jakis tam stan typu "Potrzebne pilnie", etc.',
        });

        neededGoodsMetaPayload.push({
          id: i,
          partnerId: i,
          note: fakerPL.lorem.paragraph(),
        });

        partnerEventPayload.push({
          id: i,
          partnerId: i,
          title: fakerPL.lorem.words({ min: 2, max: 3 }),
          description: fakerPL.lorem.paragraph(),
          thumbnail: fakerPL.image.avatar(),
          eventDate: faker.date.between({
            from: "2025-06-01",
            to: "2025-12-31",
          }),
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

  await prisma.neededGoods.createMany({
    data: neededGoodsPayload,
  });

  await setTimeout(100);

  await prisma.neededGoodsMeta.createMany({
    data: neededGoodsMetaPayload,
  });

  await setTimeout(100);

  await prisma.partnerEvent.createMany({
    data: partnerEventPayload,
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
