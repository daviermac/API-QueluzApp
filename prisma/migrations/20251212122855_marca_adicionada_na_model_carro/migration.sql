/*
  Warnings:

  - Added the required column `marca` to the `Carro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Carro` ADD COLUMN `marca` VARCHAR(191) NOT NULL;
