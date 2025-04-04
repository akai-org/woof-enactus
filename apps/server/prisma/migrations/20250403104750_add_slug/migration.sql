/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Partner_slug_key" ON "Partner"("slug");
