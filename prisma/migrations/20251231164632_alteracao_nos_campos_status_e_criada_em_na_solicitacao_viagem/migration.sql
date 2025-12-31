/*
  Warnings:

  - You are about to drop the column `StatusSolicitacao` on the `SolicitacaoViagem` table. All the data in the column will be lost.
  - Added the required column `criadaEm` to the `SolicitacaoViagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SolicitacaoViagem` DROP COLUMN `StatusSolicitacao`,
    ADD COLUMN `criadaEm` DATE NOT NULL,
    ADD COLUMN `statusSolicitacao` ENUM('PENDENTE', 'CONFIRMADA', 'REALIZADA', 'CANCELADA') NOT NULL DEFAULT 'PENDENTE';
