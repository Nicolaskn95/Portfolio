/*
  Warnings:

  - Changed the type of `type` on the `projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('WEB', 'MOBILE', 'GAME');

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL;
