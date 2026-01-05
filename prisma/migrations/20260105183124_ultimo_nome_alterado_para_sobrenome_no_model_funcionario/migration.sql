/*
  Warnings:

  - You are about to drop the column `ultimoNome` on the `Funcionario` table. All the data in the column will be lost.
  - Added the required column `sobrenome` to the `Funcionario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Funcionario` DROP COLUMN `ultimoNome`,
    ADD COLUMN `sobrenome` VARCHAR(191) NOT NULL;
