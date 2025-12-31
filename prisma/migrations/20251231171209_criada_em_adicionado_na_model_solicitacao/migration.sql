/*
  Warnings:

  - You are about to drop the column `criadaEm` on the `SolicitacaoReparoIluminacao` table. All the data in the column will be lost.
  - You are about to drop the column `criadaEm` on the `SolicitacaoViagem` table. All the data in the column will be lost.
  - Added the required column `criadaEm` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Solicitacao` ADD COLUMN `criadaEm` DATE NOT NULL;

-- AlterTable
ALTER TABLE `SolicitacaoReparoIluminacao` DROP COLUMN `criadaEm`;

-- AlterTable
ALTER TABLE `SolicitacaoViagem` DROP COLUMN `criadaEm`;
