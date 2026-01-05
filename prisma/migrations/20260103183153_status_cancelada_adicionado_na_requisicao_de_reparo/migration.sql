-- AlterTable
ALTER TABLE `SolicitacaoReparoIluminacao` MODIFY `statusSolicitacao` ENUM('RECEBIDA', 'ATENDIDA', 'CANCELADA') NOT NULL DEFAULT 'RECEBIDA';
