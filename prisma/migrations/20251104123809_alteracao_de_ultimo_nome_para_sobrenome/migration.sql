/*
  Warnings:

  - You are about to drop the column `ultimoNome` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `sobrenome` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Usuario` DROP COLUMN `ultimoNome`,
    ADD COLUMN `sobrenome` VARCHAR(255) NOT NULL;
