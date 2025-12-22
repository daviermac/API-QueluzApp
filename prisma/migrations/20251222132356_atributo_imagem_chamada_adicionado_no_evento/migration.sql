/*
  Warnings:

  - Added the required column `imagem_chamada` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Evento` ADD COLUMN `imagem_chamada` VARCHAR(191) NOT NULL;
