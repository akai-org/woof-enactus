/*
  Warnings:

  - A unique constraint covering the columns `[partnerId]` on the table `NeededGoods` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NeededGoods_partnerId_key" ON "NeededGoods"("partnerId");
