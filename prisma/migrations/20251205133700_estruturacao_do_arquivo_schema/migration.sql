/*
  Warnings:

  - You are about to alter the column `nomeCompleto` on the `Acompanhante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `endereco` on the `Acompanhante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `email` on the `Acompanhante` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `modelo` on the `Carro` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `cor` on the `Carro` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `titulo` on the `Curso` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `descricao` on the `Curso` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `local_curso` on the `Curso` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `imagem_capa` on the `Curso` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `nome_especialidade` on the `Especialidade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `titulo` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `descricao` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `local_evento` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `imagem_capa` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `nome` on the `Funcao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `assunto` on the `MensagemOuvidoria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `nomeSolicitante` on the `MensagemOuvidoria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `emailSolicitante` on the `MensagemOuvidoria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `endereco` on the `Parada` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `primeiro_nome_solicitante` on the `Solicitacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `sobrenome_solicitante` on the `Solicitacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `email_solicitante` on the `Solicitacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `endereco_paciente` on the `SolicitacaoViagem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `local_consulta` on the `SolicitacaoViagem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `cidade_consulta` on the `SolicitacaoViagem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `comprovante_url` on the `SolicitacaoViagem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `nome_taxista` on the `Taxista` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `nome_unidade` on the `UnidadeUbs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `endereco_unidade` on the `UnidadeUbs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `primeiroNome` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `sobrenome` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `email` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `senha` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `endereco` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `enderecoLocalPartida` on the `Viagem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `EspecialidadeUnidadeUbs` DROP FOREIGN KEY `fk_especialidade`;

-- DropForeignKey
ALTER TABLE `EspecialidadeUnidadeUbs` DROP FOREIGN KEY `fk_unidade`;

-- DropForeignKey
ALTER TABLE `Funcionario` DROP FOREIGN KEY `fk_funcionario_usuario`;

-- DropForeignKey
ALTER TABLE `FuncionarioFuncao` DROP FOREIGN KEY `fk_funcfunc_funcao`;

-- DropForeignKey
ALTER TABLE `FuncionarioFuncao` DROP FOREIGN KEY `fk_funcfunc_funcionario`;

-- DropForeignKey
ALTER TABLE `MensagemOuvidoria` DROP FOREIGN KEY `fk_msg_solicitacao`;

-- DropForeignKey
ALTER TABLE `Parada` DROP FOREIGN KEY `fk_parada_solviagem`;

-- DropForeignKey
ALTER TABLE `Parada` DROP FOREIGN KEY `fk_parada_viagem`;

-- DropForeignKey
ALTER TABLE `PedidoConsulta` DROP FOREIGN KEY `fk_pedidoconsulta_solicitacao`;

-- DropForeignKey
ALTER TABLE `PedidoConsulta` DROP FOREIGN KEY `fk_pedidoconsulta_unidade`;

-- DropForeignKey
ALTER TABLE `Solicitacao` DROP FOREIGN KEY `fk_solicitacao_usuario`;

-- DropForeignKey
ALTER TABLE `SolicitacaoViagem` DROP FOREIGN KEY `fk_solviagem_acomp`;

-- DropForeignKey
ALTER TABLE `SolicitacaoViagem` DROP FOREIGN KEY `fk_solviagem_solicitacao`;

-- DropForeignKey
ALTER TABLE `SolicitacaoViagem` DROP FOREIGN KEY `fk_solviagem_viagem`;

-- DropForeignKey
ALTER TABLE `Viagem` DROP FOREIGN KEY `fk_viagem_carro`;

-- DropForeignKey
ALTER TABLE `Viagem` DROP FOREIGN KEY `fk_viagem_funcionario`;

-- AlterTable
ALTER TABLE `Acompanhante` MODIFY `nomeCompleto` VARCHAR(191) NOT NULL,
    MODIFY `endereco` VARCHAR(191) NOT NULL,
    MODIFY `telefone` CHAR(11) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Carro` MODIFY `modelo` VARCHAR(191) NOT NULL,
    MODIFY `cor` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Curso` MODIFY `titulo` VARCHAR(191) NOT NULL,
    MODIFY `descricao` VARCHAR(191) NOT NULL,
    MODIFY `local_curso` VARCHAR(191) NOT NULL,
    MODIFY `imagem_capa` VARCHAR(191) NOT NULL,
    MODIFY `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Especialidade` MODIFY `nome_especialidade` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Evento` MODIFY `titulo` VARCHAR(191) NOT NULL,
    MODIFY `descricao` VARCHAR(191) NOT NULL,
    MODIFY `local_evento` VARCHAR(191) NOT NULL,
    MODIFY `imagem_capa` VARCHAR(191) NOT NULL,
    MODIFY `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Funcao` MODIFY `nome` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `MensagemOuvidoria` MODIFY `assunto` VARCHAR(191) NOT NULL,
    MODIFY `mensagem` VARCHAR(191) NOT NULL,
    MODIFY `nomeSolicitante` VARCHAR(191) NULL,
    MODIFY `emailSolicitante` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Parada` MODIFY `endereco` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Solicitacao` MODIFY `primeiro_nome_solicitante` VARCHAR(191) NOT NULL,
    MODIFY `sobrenome_solicitante` VARCHAR(191) NOT NULL,
    MODIFY `email_solicitante` VARCHAR(191) NOT NULL,
    MODIFY `telefone_solicitante` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SolicitacaoViagem` MODIFY `endereco_paciente` VARCHAR(191) NOT NULL,
    MODIFY `local_consulta` VARCHAR(191) NOT NULL,
    MODIFY `cidade_consulta` VARCHAR(191) NOT NULL,
    MODIFY `comprovante_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Taxista` MODIFY `nome_taxista` VARCHAR(191) NOT NULL,
    MODIFY `telefone_taxista` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UnidadeUbs` MODIFY `nome_unidade` VARCHAR(191) NOT NULL,
    MODIFY `endereco_unidade` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `primeiroNome` VARCHAR(191) NOT NULL,
    MODIFY `sobrenome` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `senha` VARCHAR(191) NOT NULL,
    MODIFY `endereco` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Viagem` MODIFY `dataPartida` DATETIME(3) NOT NULL,
    MODIFY `enderecoLocalPartida` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Funcionario` ADD CONSTRAINT `Funcionario_Usuario_idUsuario_fkey` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FuncionarioFuncao` ADD CONSTRAINT `FuncionarioFuncao_Funcao_idFuncao_fkey` FOREIGN KEY (`Funcao_idFuncao`) REFERENCES `Funcao`(`idFuncao`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FuncionarioFuncao` ADD CONSTRAINT `FuncionarioFuncao_Funcionario_idFuncionario_fkey` FOREIGN KEY (`Funcionario_idFuncionario`) REFERENCES `Funcionario`(`idFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `Solicitacao_Usuario_idUsuario_fkey` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MensagemOuvidoria` ADD CONSTRAINT `MensagemOuvidoria_Solicitacao_idSolicitacao_fkey` FOREIGN KEY (`Solicitacao_idSolicitacao`) REFERENCES `Solicitacao`(`idSolicitacao`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EspecialidadeUnidadeUbs` ADD CONSTRAINT `EspecialidadeUnidadeUbs_Especialidade_idEspecialidade_fkey` FOREIGN KEY (`Especialidade_idEspecialidade`) REFERENCES `Especialidade`(`idEspecialidade`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EspecialidadeUnidadeUbs` ADD CONSTRAINT `EspecialidadeUnidadeUbs_UnidadeUbs_idUnidadeUbs_fkey` FOREIGN KEY (`UnidadeUbs_idUnidadeUbs`) REFERENCES `UnidadeUbs`(`idUnidadeUbs`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoConsulta` ADD CONSTRAINT `PedidoConsulta_Solicitacao_idSolicitacao_fkey` FOREIGN KEY (`Solicitacao_idSolicitacao`) REFERENCES `Solicitacao`(`idSolicitacao`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoConsulta` ADD CONSTRAINT `PedidoConsulta_UnidadeUbs_idUnidadeUbs_fkey` FOREIGN KEY (`UnidadeUbs_idUnidadeUbs`) REFERENCES `UnidadeUbs`(`idUnidadeUbs`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `SolicitacaoViagem_Acompanhante_idAcompanhante_fkey` FOREIGN KEY (`Acompanhante_idAcompanhante`) REFERENCES `Acompanhante`(`idAcompanhante`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `SolicitacaoViagem_Solicitacao_idSolicitacao_fkey` FOREIGN KEY (`Solicitacao_idSolicitacao`) REFERENCES `Solicitacao`(`idSolicitacao`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `SolicitacaoViagem_Viagem_idViagem_fkey` FOREIGN KEY (`Viagem_idViagem`) REFERENCES `Viagem`(`idViagem`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Viagem` ADD CONSTRAINT `Viagem_Carro_idCarro_fkey` FOREIGN KEY (`Carro_idCarro`) REFERENCES `Carro`(`idCarro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Viagem` ADD CONSTRAINT `Viagem_Funcionario_idFuncionario_fkey` FOREIGN KEY (`Funcionario_idFuncionario`) REFERENCES `Funcionario`(`idFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parada` ADD CONSTRAINT `Parada_SolicitacaoViagem_idSolicitacaoViagem_fkey` FOREIGN KEY (`SolicitacaoViagem_idSolicitacaoViagem`) REFERENCES `SolicitacaoViagem`(`idSolicitacaoViagem`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parada` ADD CONSTRAINT `Parada_Viagem_idViagem_fkey` FOREIGN KEY (`Viagem_idViagem`) REFERENCES `Viagem`(`idViagem`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `EspecialidadeUnidadeUbs` RENAME INDEX `fk_unidade` TO `EspecialidadeUnidadeUbs_UnidadeUbs_idUnidadeUbs_idx`;

-- RenameIndex
ALTER TABLE `Funcionario` RENAME INDEX `fk_funcionario_usuario` TO `Funcionario_Usuario_idUsuario_idx`;

-- RenameIndex
ALTER TABLE `FuncionarioFuncao` RENAME INDEX `fk_funcfunc_funcao` TO `FuncionarioFuncao_Funcao_idFuncao_idx`;

-- RenameIndex
ALTER TABLE `MensagemOuvidoria` RENAME INDEX `fk_msg_solicitacao` TO `MensagemOuvidoria_Solicitacao_idSolicitacao_idx`;

-- RenameIndex
ALTER TABLE `Parada` RENAME INDEX `fk_parada_solviagem` TO `Parada_SolicitacaoViagem_idSolicitacaoViagem_idx`;

-- RenameIndex
ALTER TABLE `Parada` RENAME INDEX `fk_parada_viagem` TO `Parada_Viagem_idViagem_idx`;

-- RenameIndex
ALTER TABLE `PedidoConsulta` RENAME INDEX `fk_pedidoconsulta_solicitacao` TO `PedidoConsulta_Solicitacao_idSolicitacao_idx`;

-- RenameIndex
ALTER TABLE `PedidoConsulta` RENAME INDEX `fk_pedidoconsulta_unidade` TO `PedidoConsulta_UnidadeUbs_idUnidadeUbs_idx`;

-- RenameIndex
ALTER TABLE `Solicitacao` RENAME INDEX `fk_solicitacao_usuario` TO `Solicitacao_Usuario_idUsuario_idx`;

-- RenameIndex
ALTER TABLE `SolicitacaoViagem` RENAME INDEX `fk_solviagem_acomp` TO `SolicitacaoViagem_Acompanhante_idAcompanhante_idx`;

-- RenameIndex
ALTER TABLE `SolicitacaoViagem` RENAME INDEX `fk_solviagem_solicitacao` TO `SolicitacaoViagem_Solicitacao_idSolicitacao_idx`;

-- RenameIndex
ALTER TABLE `SolicitacaoViagem` RENAME INDEX `fk_solviagem_viagem` TO `SolicitacaoViagem_Viagem_idViagem_idx`;

-- RenameIndex
ALTER TABLE `Viagem` RENAME INDEX `fk_viagem_carro` TO `Viagem_Carro_idCarro_idx`;

-- RenameIndex
ALTER TABLE `Viagem` RENAME INDEX `fk_viagem_funcionario` TO `Viagem_Funcionario_idFuncionario_idx`;
