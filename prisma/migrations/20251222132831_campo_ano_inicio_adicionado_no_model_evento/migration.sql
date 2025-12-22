/*
  Warnings:

  - Added the required column `anoInicio` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Evento` ADD COLUMN `anoInicio` INTEGER NOT NULL;
