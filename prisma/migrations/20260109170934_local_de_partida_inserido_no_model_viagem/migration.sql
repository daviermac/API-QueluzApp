/*
  Warnings:

  - Added the required column `localPartida` to the `Viagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Viagem` ADD COLUMN `localPartida` VARCHAR(191) NOT NULL;
