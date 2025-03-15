-- AlterTable
ALTER TABLE "PartnerProfile" ADD COLUMN     "animals" TEXT[],
ADD COLUMN     "description" TEXT,
ADD COLUMN     "getToInfo" TEXT,
ADD COLUMN     "visitHours" TEXT;

-- CreateTable
CREATE TABLE "WorkingHours" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "monday" TEXT NOT NULL,
    "tuesday" TEXT NOT NULL,
    "wednesday" TEXT NOT NULL,
    "thursday" TEXT NOT NULL,
    "friday" TEXT NOT NULL,
    "saturday" TEXT NOT NULL,
    "sunday" TEXT NOT NULL,

    CONSTRAINT "WorkingHours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkingHours_uuid_key" ON "WorkingHours"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "WorkingHours_profileId_key" ON "WorkingHours"("profileId");

-- AddForeignKey
ALTER TABLE "WorkingHours" ADD CONSTRAINT "WorkingHours_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "PartnerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
