/*
  Warnings:

  - Added the required column `isActive` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Partner_name_key";

-- DropIndex
DROP INDEX "Partner_tin_key";

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
