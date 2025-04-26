/*
  Warnings:

  - You are about to drop the column `note` on the `NeededGoods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NeededGoods" DROP COLUMN "note";

-- CreateTable
CREATE TABLE "NeededGoodsMeta" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "note" TEXT,

    CONSTRAINT "NeededGoodsMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NeededGoodsMeta_uuid_key" ON "NeededGoodsMeta"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "NeededGoodsMeta_partnerId_key" ON "NeededGoodsMeta"("partnerId");

-- AddForeignKey
ALTER TABLE "NeededGoodsMeta" ADD CONSTRAINT "NeededGoodsMeta_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
