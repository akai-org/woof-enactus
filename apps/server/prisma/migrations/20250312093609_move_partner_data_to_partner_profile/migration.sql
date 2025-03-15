/*
  Warnings:

  - You are about to drop the column `city` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `postal` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Partner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "city",
DROP COLUMN "phone",
DROP COLUMN "postal",
DROP COLUMN "street",
DROP COLUMN "website";

-- CreateTable
CREATE TABLE "PartnerProfile" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "city" TEXT,
    "street" TEXT,
    "postal" TEXT,
    "phone" TEXT,
    "website" TEXT,

    CONSTRAINT "PartnerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartnerProfile_uuid_key" ON "PartnerProfile"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerProfile_partnerId_key" ON "PartnerProfile"("partnerId");

-- AddForeignKey
ALTER TABLE "PartnerProfile" ADD CONSTRAINT "PartnerProfile_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
