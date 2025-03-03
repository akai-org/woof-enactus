-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('VET', 'ORG', 'SHOP', 'SHELTER');

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "street" TEXT,
    "postal" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "type" "PartnerType" NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partner_uuid_key" ON "Partner"("uuid");
