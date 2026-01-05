/*
  Warnings:

  - You are about to drop the column `motivo_cancelamento` on the `SolicitacaoViagem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Solicitacao` ADD COLUMN `motivo_cancelamento` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `SolicitacaoViagem` DROP COLUMN `motivo_cancelamento`;
