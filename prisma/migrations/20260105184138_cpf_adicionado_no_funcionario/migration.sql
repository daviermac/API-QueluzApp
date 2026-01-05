/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Funcionario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Funcionario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Funcionario` ADD COLUMN `cpf` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Funcionario_cpf_key` ON `Funcionario`(`cpf`);
