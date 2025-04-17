/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `PartnerAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PartnerAccount_username_key" ON "PartnerAccount"("username");
