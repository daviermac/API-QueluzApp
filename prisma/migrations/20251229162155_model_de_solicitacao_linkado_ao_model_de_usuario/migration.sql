/*
  Warnings:

  - Added the required column `usuarioId` to the `SolicitacaoReparoIluminacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SolicitacaoReparoIluminacao` ADD COLUMN `usuarioId` VARCHAR(191) NOT NULL,
    MODIFY `statusSolicitacao` ENUM('RECEBIDA', 'ATENDIDA') NOT NULL DEFAULT 'RECEBIDA';

-- CreateIndex
CREATE INDEX `SolicitacaoReparoIluminacao_usuarioId_idx` ON `SolicitacaoReparoIluminacao`(`usuarioId`);

-- AddForeignKey
ALTER TABLE `SolicitacaoReparoIluminacao` ADD CONSTRAINT `SolicitacaoReparoIluminacao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
