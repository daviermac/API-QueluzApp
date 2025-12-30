/*
  Warnings:

  - Added the required column `Solicitacao_idSolicitacao` to the `SolicitacaoReparoIluminacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SolicitacaoReparoIluminacao` ADD COLUMN `Solicitacao_idSolicitacao` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `SolicitacaoReparoIluminacao_Solicitacao_idSolicitacao_idx` ON `SolicitacaoReparoIluminacao`(`Solicitacao_idSolicitacao`);

-- AddForeignKey
ALTER TABLE `SolicitacaoReparoIluminacao` ADD CONSTRAINT `SolicitacaoReparoIluminacao_Solicitacao_idSolicitacao_fkey` FOREIGN KEY (`Solicitacao_idSolicitacao`) REFERENCES `Solicitacao`(`idSolicitacao`) ON DELETE CASCADE ON UPDATE CASCADE;
