/*
  Warnings:

  - You are about to drop the column `StatusSolicitacao_idStatusViagem` on the `SolicitacaoViagem` table. All the data in the column will be lost.
  - You are about to drop the `StatusSolicitacao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `StatusSolicitacaoViagem_idStatusViagem` to the `SolicitacaoViagem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `SolicitacaoViagem` DROP FOREIGN KEY `fk_solviagem_status`;

-- DropIndex
DROP INDEX `fk_solviagem_status` ON `SolicitacaoViagem`;

-- AlterTable
ALTER TABLE `SolicitacaoViagem` DROP COLUMN `StatusSolicitacao_idStatusViagem`,
    ADD COLUMN `StatusSolicitacaoViagem_idStatusViagem` INTEGER NOT NULL;

-- DropTable
DROP TABLE `StatusSolicitacao`;

-- CreateTable
CREATE TABLE `StatusSolicitacaoViagem` (
    `idStatusViagem` INTEGER NOT NULL AUTO_INCREMENT,
    `statusViagem` ENUM('PENDENTE', 'CONFIRMADA', 'REALIZADA', 'CANCELADA') NOT NULL,

    PRIMARY KEY (`idStatusViagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `fk_solviagem_status` ON `SolicitacaoViagem`(`StatusSolicitacaoViagem_idStatusViagem`);

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `fk_solviagem_status` FOREIGN KEY (`StatusSolicitacaoViagem_idStatusViagem`) REFERENCES `StatusSolicitacaoViagem`(`idStatusViagem`) ON DELETE NO ACTION ON UPDATE NO ACTION;
