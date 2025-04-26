/*
  Warnings:

  - You are about to drop the column `partnerAccountId` on the `Partner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_partnerAccountId_fkey";

-- DropIndex
DROP INDEX "Partner_partnerAccountId_key";

-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "partnerAccountId",
ADD COLUMN     "accountId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Partner_accountId_key" ON "Partner"("accountId");

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "PartnerAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
