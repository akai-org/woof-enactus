-- CreateEnum
CREATE TYPE "GoodsState" AS ENUM ('OK', 'MEDIUM', 'LOW');

-- DropForeignKey
ALTER TABLE "WorkingHours" DROP CONSTRAINT "WorkingHours_profileId_fkey";

-- CreateTable
CREATE TABLE "NeededGoods" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "note" TEXT,
    "amountCurrent" INTEGER,
    "amountMax" INTEGER NOT NULL,
    "amountUnit" TEXT,
    "state" "GoodsState" NOT NULL,
    "stateInfo" TEXT,

    CONSTRAINT "NeededGoods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NeededGoods_uuid_key" ON "NeededGoods"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "NeededGoods_partnerId_key" ON "NeededGoods"("partnerId");

-- AddForeignKey
ALTER TABLE "WorkingHours" ADD CONSTRAINT "WorkingHours_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "PartnerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeededGoods" ADD CONSTRAINT "NeededGoods_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
