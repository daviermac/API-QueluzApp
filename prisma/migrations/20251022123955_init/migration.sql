-- CreateTable
CREATE TABLE `Acompanhante` (
    `idAcompanhante` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nomeCompleto` VARCHAR(255) NULL,
    `endereco` VARCHAR(255) NULL,
    `telefone` VARCHAR(11) NULL,
    `email` VARCHAR(255) NULL,

    PRIMARY KEY (`idAcompanhante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carro` (
    `idCarro` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `StatusCarro_idStatusCarro` INTEGER UNSIGNED NOT NULL,
    `TipoCarro_idTipoCarro` INTEGER UNSIGNED NOT NULL,
    `modelo` VARCHAR(255) NULL,
    `cor` VARCHAR(255) NULL,
    `placa` VARCHAR(255) NULL,
    `capacidade` INTEGER UNSIGNED NULL,

    INDEX `fk_Carro_StatusCarro`(`StatusCarro_idStatusCarro`),
    INDEX `fk_Carro_TipoCarro`(`TipoCarro_idTipoCarro`),
    PRIMARY KEY (`idCarro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaMensagemOuvidoria` (
    `idCategoriaMensagemOuvidoria` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NULL,

    PRIMARY KEY (`idCategoriaMensagemOuvidoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Data_Tabela` (
    `idData_Evento` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `data_evento` DATETIME(0) NOT NULL,

    PRIMARY KEY (`idData_Evento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dias_Trabalho_Taxista` (
    `Data_Tabela_idData_Evento` INTEGER UNSIGNED NOT NULL,
    `Taxista_idTaxista` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_DiasTrabalho_Taxista`(`Taxista_idTaxista`),
    PRIMARY KEY (`Data_Tabela_idData_Evento`, `Taxista_idTaxista`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evento` (
    `idEvento` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(255) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `local_evento` VARCHAR(255) NULL,
    `setor_responsavel` VARCHAR(255) NULL,
    `categoria` INTEGER UNSIGNED NULL,
    `imagem_url` VARCHAR(255) NULL,

    PRIMARY KEY (`idEvento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evento_Data` (
    `Evento_idEvento` INTEGER UNSIGNED NOT NULL,
    `Data_Tabela_idData_Evento` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_Evento_Data_Data`(`Data_Tabela_idData_Evento`),
    PRIMARY KEY (`Evento_idEvento`, `Data_Tabela_idData_Evento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcao` (
    `idFuncao` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NULL,

    PRIMARY KEY (`idFuncao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionario` (
    `idFuncionario` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Usuario_idUsuario` INTEGER UNSIGNED NOT NULL,
    `pis` INTEGER UNSIGNED NULL,
    `matricula` INTEGER UNSIGNED NULL,

    INDEX `fk_Funcionario_Usuario`(`Usuario_idUsuario`),
    PRIMARY KEY (`idFuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FuncionarioFuncao` (
    `Funcionario_idFuncionario` INTEGER UNSIGNED NOT NULL,
    `Funcao_idFuncao` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_FuncionarioFuncao_Funcao`(`Funcao_idFuncao`),
    PRIMARY KEY (`Funcionario_idFuncionario`, `Funcao_idFuncao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MensagemOuvidoria` (
    `idMensagemOuvidoria` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Usuario_idUsuario` INTEGER UNSIGNED NOT NULL,
    `CategoriaMensagemOuvidoria_idCategoriaMensagemOuvidoria` INTEGER UNSIGNED NOT NULL,
    `assunto` VARCHAR(255) NULL,
    `mensagem` VARCHAR(255) NULL,
    `nomeSolicitante` VARCHAR(255) NULL,
    `emailSolicitante` VARCHAR(255) NULL,
    `numeroProtocolo` CHAR(15) NULL,
    `status_2` VARCHAR(255) NULL,

    INDEX `fk_MensagemOuvidoria_Categoria`(`CategoriaMensagemOuvidoria_idCategoriaMensagemOuvidoria`),
    INDEX `fk_MensagemOuvidoria_Usuario`(`Usuario_idUsuario`),
    PRIMARY KEY (`idMensagemOuvidoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parada` (
    `idParada` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `SolicitacaoViagem_idSolicitacaoViagem` INTEGER UNSIGNED NOT NULL,
    `Viagem_idViagem` INTEGER UNSIGNED NOT NULL,
    `endereco` VARCHAR(255) NULL,

    INDEX `fk_Parada_Solicitacao`(`SolicitacaoViagem_idSolicitacaoViagem`),
    INDEX `fk_Parada_Viagem`(`Viagem_idViagem`),
    PRIMARY KEY (`idParada`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SolicitacaoViagem` (
    `idSolicitacaoViagem` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Acompanhante_idAcompanhante` INTEGER UNSIGNED NOT NULL,
    `StatusSolicitacao_idStatusViagem` INTEGER UNSIGNED NOT NULL,
    `Viagem_idViagem` INTEGER UNSIGNED NOT NULL,
    `Usuario_idUsuario` INTEGER UNSIGNED NOT NULL,
    `primeiro_nome_paciente` VARCHAR(255) NOT NULL,
    `sobrenome_paciente` VARCHAR(255) NOT NULL,
    `email_paciente` VARCHAR(255) NOT NULL,
    `telefone_paciente` VARCHAR(255) NOT NULL,
    `endereco_paciente` VARCHAR(255) NOT NULL,
    `local_consulta` VARCHAR(255) NOT NULL,
    `endereco_local` VARCHAR(255) NOT NULL,
    `comprovante_url` VARCHAR(255) NOT NULL,
    `data_consulta` DATE NOT NULL,
    `horario_consulta` DATE NOT NULL,

    INDEX `fk_SolicitacaoViagem_Acompanhante`(`Acompanhante_idAcompanhante`),
    INDEX `fk_SolicitacaoViagem_Status`(`StatusSolicitacao_idStatusViagem`),
    INDEX `fk_SolicitacaoViagem_Usuario`(`Usuario_idUsuario`),
    INDEX `fk_SolicitacaoViagem_Viagem`(`Viagem_idViagem`),
    PRIMARY KEY (`idSolicitacaoViagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusCarro` (
    `idStatusCarro` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `statusCarro` VARCHAR(255) NULL,

    PRIMARY KEY (`idStatusCarro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusSolicitacao` (
    `idStatusViagem` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `statusViagem` VARCHAR(255) NULL,

    PRIMARY KEY (`idStatusViagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Taxista` (
    `idTaxista` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NULL,
    `telefone` CHAR(11) NULL,

    PRIMARY KEY (`idTaxista`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoCarro` (
    `idTipoCarro` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NULL,

    PRIMARY KEY (`idTipoCarro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `primeiroNome` VARCHAR(255) NOT NULL,
    `sobrenome` VARCHAR(255) NOT NULL,
    `cpf` CHAR(11) NOT NULL,
    `telefone` CHAR(11) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `endereco` VARCHAR(255) NOT NULL,
    `telefoneConfirmado` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `Usuario_cpf_key`(`cpf`),
    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Viagem` (
    `idViagem` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Funcionario_idFuncionario` INTEGER UNSIGNED NOT NULL,
    `Carro_idCarro` INTEGER UNSIGNED NOT NULL,
    `dataPartida` DATETIME(0) NULL,

    INDEX `fk_Viagem_Carro`(`Carro_idCarro`),
    INDEX `fk_Viagem_Funcionario`(`Funcionario_idFuncionario`),
    PRIMARY KEY (`idViagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Carro` ADD CONSTRAINT `fk_Carro_StatusCarro` FOREIGN KEY (`StatusCarro_idStatusCarro`) REFERENCES `StatusCarro`(`idStatusCarro`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Carro` ADD CONSTRAINT `fk_Carro_TipoCarro` FOREIGN KEY (`TipoCarro_idTipoCarro`) REFERENCES `TipoCarro`(`idTipoCarro`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Dias_Trabalho_Taxista` ADD CONSTRAINT `fk_DiasTrabalho_Data` FOREIGN KEY (`Data_Tabela_idData_Evento`) REFERENCES `Data_Tabela`(`idData_Evento`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Dias_Trabalho_Taxista` ADD CONSTRAINT `fk_DiasTrabalho_Taxista` FOREIGN KEY (`Taxista_idTaxista`) REFERENCES `Taxista`(`idTaxista`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Evento_Data` ADD CONSTRAINT `fk_Evento_Data_Data` FOREIGN KEY (`Data_Tabela_idData_Evento`) REFERENCES `Data_Tabela`(`idData_Evento`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Evento_Data` ADD CONSTRAINT `fk_Evento_Data_Evento` FOREIGN KEY (`Evento_idEvento`) REFERENCES `Evento`(`idEvento`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Funcionario` ADD CONSTRAINT `fk_Funcionario_Usuario` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `FuncionarioFuncao` ADD CONSTRAINT `fk_FuncionarioFuncao_Funcao` FOREIGN KEY (`Funcao_idFuncao`) REFERENCES `Funcao`(`idFuncao`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `FuncionarioFuncao` ADD CONSTRAINT `fk_FuncionarioFuncao_Funcionario` FOREIGN KEY (`Funcionario_idFuncionario`) REFERENCES `Funcionario`(`idFuncionario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MensagemOuvidoria` ADD CONSTRAINT `fk_MensagemOuvidoria_Categoria` FOREIGN KEY (`CategoriaMensagemOuvidoria_idCategoriaMensagemOuvidoria`) REFERENCES `CategoriaMensagemOuvidoria`(`idCategoriaMensagemOuvidoria`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `MensagemOuvidoria` ADD CONSTRAINT `fk_MensagemOuvidoria_Usuario` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Parada` ADD CONSTRAINT `fk_Parada_Solicitacao` FOREIGN KEY (`SolicitacaoViagem_idSolicitacaoViagem`) REFERENCES `SolicitacaoViagem`(`idSolicitacaoViagem`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Parada` ADD CONSTRAINT `fk_Parada_Viagem` FOREIGN KEY (`Viagem_idViagem`) REFERENCES `Viagem`(`idViagem`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `fk_SolicitacaoViagem_Acompanhante` FOREIGN KEY (`Acompanhante_idAcompanhante`) REFERENCES `Acompanhante`(`idAcompanhante`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `fk_SolicitacaoViagem_Status` FOREIGN KEY (`StatusSolicitacao_idStatusViagem`) REFERENCES `StatusSolicitacao`(`idStatusViagem`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `fk_SolicitacaoViagem_Usuario` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `fk_SolicitacaoViagem_Viagem` FOREIGN KEY (`Viagem_idViagem`) REFERENCES `Viagem`(`idViagem`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Viagem` ADD CONSTRAINT `fk_Viagem_Carro` FOREIGN KEY (`Carro_idCarro`) REFERENCES `Carro`(`idCarro`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Viagem` ADD CONSTRAINT `fk_Viagem_Funcionario` FOREIGN KEY (`Funcionario_idFuncionario`) REFERENCES `Funcionario`(`idFuncionario`) ON DELETE RESTRICT ON UPDATE RESTRICT;
