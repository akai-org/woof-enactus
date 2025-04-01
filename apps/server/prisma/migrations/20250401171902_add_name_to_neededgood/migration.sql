/*
  Warnings:

  - Added the required column `name` to the `NeededGoods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NeededGoods" ADD COLUMN     "name" TEXT NOT NULL;
