-- DropForeignKey
ALTER TABLE "PartnerProfile" DROP CONSTRAINT "PartnerProfile_partnerId_fkey";

-- AddForeignKey
ALTER TABLE "PartnerProfile" ADD CONSTRAINT "PartnerProfile_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
