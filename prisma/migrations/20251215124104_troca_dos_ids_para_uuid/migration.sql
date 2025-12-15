/*
  Warnings:

  - The primary key for the `Acompanhante` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AcompanhantePaciente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Carro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Curso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Especialidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EspecialidadeUnidadeUbs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Evento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Funcao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Funcionario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FuncionarioFuncao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MensagemOuvidoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Noticia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Noticia` table. All the data in the column will be lost.
  - The primary key for the `PedidoConsulta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Solicitacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SolicitacaoViagem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UnidadeUbs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Viagem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Parada` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Taxista` table. If the table is not empty, all the data it contains will be lost.
  - The required column `idNoticia` was added to the `Noticia` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `AcompanhantePaciente` DROP FOREIGN KEY `AcompanhantePaciente_Acompanhante_idAcompanhante_fkey`;

-- DropForeignKey
ALTER TABLE `AcompanhantePaciente` DROP FOREIGN KEY `AcompanhantePaciente_Usuario_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `EspecialidadeUnidadeUbs` DROP FOREIGN KEY `EspecialidadeUnidadeUbs_Especialidade_idEspecialidade_fkey`;

-- DropForeignKey
ALTER TABLE `EspecialidadeUnidadeUbs` DROP FOREIGN KEY `EspecialidadeUnidadeUbs_UnidadeUbs_idUnidadeUbs_fkey`;

-- DropForeignKey
ALTER TABLE `Funcionario` DROP FOREIGN KEY `Funcionario_Usuario_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `FuncionarioFuncao` DROP FOREIGN KEY `FuncionarioFuncao_Funcao_idFuncao_fkey`;

-- DropForeignKey
ALTER TABLE `FuncionarioFuncao` DROP FOREIGN KEY `FuncionarioFuncao_Funcionario_idFuncionario_fkey`;

-- DropForeignKey
ALTER TABLE `MensagemOuvidoria` DROP FOREIGN KEY `MensagemOuvidoria_Solicitacao_idSolicitacao_fkey`;

-- DropForeignKey
ALTER TABLE `Parada` DROP FOREIGN KEY `Parada_SolicitacaoViagem_idSolicitacaoViagem_fkey`;

-- DropForeignKey
ALTER TABLE `Parada` DROP FOREIGN KEY `Parada_Viagem_idViagem_fkey`;

-- DropForeignKey
ALTER TABLE `PedidoConsulta` DROP FOREIGN KEY `PedidoConsulta_Solicitacao_idSolicitacao_fkey`;

-- DropForeignKey
ALTER TABLE `PedidoConsulta` DROP FOREIGN KEY `PedidoConsulta_UnidadeUbs_idUnidadeUbs_fkey`;

-- DropForeignKey
ALTER TABLE `Solicitacao` DROP FOREIGN KEY `Solicitacao_Usuario_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `SolicitacaoViagem` DROP FOREIGN KEY `SolicitacaoViagem_Acompanhante_idAcompanhante_fkey`;

-- DropForeignKey
ALTER TABLE `SolicitacaoViagem` DROP FOREIGN KEY `SolicitacaoViagem_Solicitacao_idSolicitacao_fkey`;

-- DropForeignKey
ALTER TABLE `SolicitacaoViagem` DROP FOREIGN KEY `SolicitacaoViagem_Viagem_idViagem_fkey`;

-- DropForeignKey
ALTER TABLE `Viagem` DROP FOREIGN KEY `Viagem_Carro_idCarro_fkey`;

-- DropForeignKey
ALTER TABLE `Viagem` DROP FOREIGN KEY `Viagem_Funcionario_idFuncionario_fkey`;

-- AlterTable
ALTER TABLE `Acompanhante` DROP PRIMARY KEY,
    MODIFY `idAcompanhante` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idAcompanhante`);

-- AlterTable
ALTER TABLE `AcompanhantePaciente` DROP PRIMARY KEY,
    MODIFY `Acompanhante_idAcompanhante` VARCHAR(191) NOT NULL,
    MODIFY `Usuario_idUsuario` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Acompanhante_idAcompanhante`, `Usuario_idUsuario`);

-- AlterTable
ALTER TABLE `Carro` DROP PRIMARY KEY,
    MODIFY `idCarro` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idCarro`);

-- AlterTable
ALTER TABLE `Curso` DROP PRIMARY KEY,
    MODIFY `idCurso` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idCurso`);

-- AlterTable
ALTER TABLE `Especialidade` DROP PRIMARY KEY,
    MODIFY `idEspecialidade` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idEspecialidade`);

-- AlterTable
ALTER TABLE `EspecialidadeUnidadeUbs` DROP PRIMARY KEY,
    MODIFY `Especialidade_idEspecialidade` VARCHAR(191) NOT NULL,
    MODIFY `UnidadeUbs_idUnidadeUbs` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Especialidade_idEspecialidade`, `UnidadeUbs_idUnidadeUbs`);

-- AlterTable
ALTER TABLE `Evento` DROP PRIMARY KEY,
    MODIFY `idEvento` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idEvento`);

-- AlterTable
ALTER TABLE `Funcao` DROP PRIMARY KEY,
    MODIFY `idFuncao` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idFuncao`);

-- AlterTable
ALTER TABLE `Funcionario` DROP PRIMARY KEY,
    MODIFY `idFuncionario` VARCHAR(191) NOT NULL,
    MODIFY `Usuario_idUsuario` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idFuncionario`);

-- AlterTable
ALTER TABLE `FuncionarioFuncao` DROP PRIMARY KEY,
    MODIFY `Funcionario_idFuncionario` VARCHAR(191) NOT NULL,
    MODIFY `Funcao_idFuncao` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Funcionario_idFuncionario`, `Funcao_idFuncao`);

-- AlterTable
ALTER TABLE `MensagemOuvidoria` DROP PRIMARY KEY,
    MODIFY `idMensagemOuvidoria` VARCHAR(191) NOT NULL,
    MODIFY `Solicitacao_idSolicitacao` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idMensagemOuvidoria`);

-- AlterTable
ALTER TABLE `Noticia` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `idNoticia` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idNoticia`);

-- AlterTable
ALTER TABLE `PedidoConsulta` DROP PRIMARY KEY,
    MODIFY `idPedidoConsulta` VARCHAR(191) NOT NULL,
    MODIFY `UnidadeUbs_idUnidadeUbs` VARCHAR(191) NOT NULL,
    MODIFY `Solicitacao_idSolicitacao` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idPedidoConsulta`);

-- AlterTable
ALTER TABLE `Solicitacao` DROP PRIMARY KEY,
    MODIFY `idSolicitacao` VARCHAR(191) NOT NULL,
    MODIFY `Usuario_idUsuario` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idSolicitacao`);

-- AlterTable
ALTER TABLE `SolicitacaoViagem` DROP PRIMARY KEY,
    MODIFY `idSolicitacaoViagem` VARCHAR(191) NOT NULL,
    MODIFY `Solicitacao_idSolicitacao` VARCHAR(191) NOT NULL,
    MODIFY `Acompanhante_idAcompanhante` VARCHAR(191) NULL,
    MODIFY `Viagem_idViagem` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`idSolicitacaoViagem`);

-- AlterTable
ALTER TABLE `UnidadeUbs` DROP PRIMARY KEY,
    MODIFY `idUnidadeUbs` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idUnidadeUbs`);

-- AlterTable
ALTER TABLE `Usuario` DROP PRIMARY KEY,
    MODIFY `idUsuario` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idUsuario`);

-- AlterTable
ALTER TABLE `Viagem` DROP PRIMARY KEY,
    MODIFY `idViagem` VARCHAR(191) NOT NULL,
    MODIFY `Funcionario_idFuncionario` VARCHAR(191) NOT NULL,
    MODIFY `Carro_idCarro` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idViagem`);

-- DropTable
DROP TABLE `Parada`;

-- DropTable
DROP TABLE `Taxista`;

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
ALTER TABLE `AcompanhantePaciente` ADD CONSTRAINT `AcompanhantePaciente_Acompanhante_idAcompanhante_fkey` FOREIGN KEY (`Acompanhante_idAcompanhante`) REFERENCES `Acompanhante`(`idAcompanhante`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcompanhantePaciente` ADD CONSTRAINT `AcompanhantePaciente_Usuario_idUsuario_fkey` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

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
