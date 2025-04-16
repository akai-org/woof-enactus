/*
  Warnings:

  - A unique constraint covering the columns `[partnerAccountId]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `partnerAccountId` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "partnerAccountId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PartnerAccount" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "PartnerAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartnerAccount_uuid_key" ON "PartnerAccount"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_partnerAccountId_key" ON "Partner"("partnerAccountId");

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_partnerAccountId_fkey" FOREIGN KEY ("partnerAccountId") REFERENCES "PartnerAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
