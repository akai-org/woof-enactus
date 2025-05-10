/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PartnerEvent` table. All the data in the column will be lost.
  - Added the required column `eventDate` to the `PartnerEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartnerEvent" DROP COLUMN "createdAt",
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL;
