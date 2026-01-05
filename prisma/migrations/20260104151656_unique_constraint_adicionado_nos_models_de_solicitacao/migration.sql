/*
  Warnings:

  - A unique constraint covering the columns `[Solicitacao_idSolicitacao]` on the table `SolicitacaoReparoIluminacao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Solicitacao_idSolicitacao]` on the table `SolicitacaoViagem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `SolicitacaoReparoIluminacao_Solicitacao_idSolicitacao_key` ON `SolicitacaoReparoIluminacao`(`Solicitacao_idSolicitacao`);

-- CreateIndex
CREATE UNIQUE INDEX `SolicitacaoViagem_Solicitacao_idSolicitacao_key` ON `SolicitacaoViagem`(`Solicitacao_idSolicitacao`);
