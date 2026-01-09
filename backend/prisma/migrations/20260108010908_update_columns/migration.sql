/*
  Warnings:

  - Added the required column `level` to the `Technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repository` to the `Technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `types` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "repository" TEXT NOT NULL,
ADD COLUMN     "types" TEXT NOT NULL;
