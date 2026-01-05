/*
  Warnings:

  - You are about to drop the column `email` on the `Funcionario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pis]` on the table `Funcionario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matricula]` on the table `Funcionario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Funcionario` DROP COLUMN `email`;

-- CreateIndex
CREATE UNIQUE INDEX `Funcionario_pis_key` ON `Funcionario`(`pis`);

-- CreateIndex
CREATE UNIQUE INDEX `Funcionario_matricula_key` ON `Funcionario`(`matricula`);
