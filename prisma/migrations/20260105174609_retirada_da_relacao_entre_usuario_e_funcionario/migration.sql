/*
  Warnings:

  - You are about to drop the column `Usuario_idUsuario` on the `Funcionario` table. All the data in the column will be lost.
  - Added the required column `email` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primeiroNome` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ultimoNome` to the `Funcionario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Funcionario` DROP FOREIGN KEY `Funcionario_Usuario_idUsuario_fkey`;

-- DropIndex
DROP INDEX `Funcionario_Usuario_idUsuario_idx` ON `Funcionario`;

-- AlterTable
ALTER TABLE `Funcionario` DROP COLUMN `Usuario_idUsuario`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `primeiroNome` VARCHAR(191) NOT NULL,
    ADD COLUMN `senha` VARCHAR(191) NOT NULL,
    ADD COLUMN `ultimoNome` VARCHAR(191) NOT NULL;
