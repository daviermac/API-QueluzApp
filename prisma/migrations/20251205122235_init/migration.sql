-- CreateTable
CREATE TABLE `Acompanhante` (
    `idAcompanhante` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCompleto` VARCHAR(255) NOT NULL,
    `endereco` VARCHAR(255) NULL,
    `telefone` VARCHAR(11) NULL,
    `email` VARCHAR(255) NULL,

    PRIMARY KEY (`idAcompanhante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carro` (
    `idCarro` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(255) NOT NULL,
    `cor` VARCHAR(255) NOT NULL,
    `placa` VARCHAR(10) NOT NULL,
    `capacidade` INTEGER NOT NULL,
    `StatusCarro` ENUM('DISPONIVEL', 'EM USO', 'EM MANUTENCAO') NOT NULL DEFAULT 'DISPONIVEL',
    `TipoCarro` ENUM('VAN', 'MINIVAN', 'HATCH', 'SEDAN', 'SUV') NOT NULL,

    PRIMARY KEY (`idCarro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `idCurso` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(255) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `local_curso` VARCHAR(255) NOT NULL,
    `imagem_capa` VARCHAR(255) NOT NULL,
    `criado_em` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `IntervaloDatas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idCurso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Especialidade` (
    `idEspecialidade` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_especialidade` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idEspecialidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EspecialidadeUnidadeUbs` (
    `Especialidade_idEspecialidade` INTEGER NOT NULL,
    `UnidadeUbs_idUnidadeUbs` INTEGER NOT NULL,

    INDEX `fk_unidade`(`UnidadeUbs_idUnidadeUbs`),
    PRIMARY KEY (`Especialidade_idEspecialidade`, `UnidadeUbs_idUnidadeUbs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evento` (
    `idEvento` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(255) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `local_evento` VARCHAR(255) NOT NULL,
    `imagem_capa` VARCHAR(255) NOT NULL,
    `criado_em` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `mesInicio` INTEGER NOT NULL,
    `IntervaloDatas` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idEvento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcao` (
    `idFuncao` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idFuncao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionario` (
    `idFuncionario` INTEGER NOT NULL AUTO_INCREMENT,
    `Usuario_idUsuario` INTEGER NOT NULL,
    `pis` INTEGER NULL,
    `matricula` INTEGER NULL,

    INDEX `fk_funcionario_usuario`(`Usuario_idUsuario`),
    PRIMARY KEY (`idFuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FuncionarioFuncao` (
    `Funcionario_idFuncionario` INTEGER NOT NULL,
    `Funcao_idFuncao` INTEGER NOT NULL,

    INDEX `fk_funcfunc_funcao`(`Funcao_idFuncao`),
    PRIMARY KEY (`Funcionario_idFuncionario`, `Funcao_idFuncao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MensagemOuvidoria` (
    `idMensagemOuvidoria` INTEGER NOT NULL AUTO_INCREMENT,
    `Solicitacao_idSolicitacao` INTEGER NOT NULL,
    `assunto` VARCHAR(255) NOT NULL,
    `mensagem` TEXT NOT NULL,
    `nomeSolicitante` VARCHAR(255) NULL,
    `emailSolicitante` VARCHAR(255) NULL,
    `numeroProtocolo` CHAR(15) NULL,
    `status` VARCHAR(50) NULL,
    `CategoriaMensagemOuvidoria` ENUM('DENUNCIA', 'SOLICITACAO', 'SUGESTAO', 'RECLAMACAO', 'ELOGIO') NOT NULL,

    INDEX `fk_msg_solicitacao`(`Solicitacao_idSolicitacao`),
    PRIMARY KEY (`idMensagemOuvidoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parada` (
    `idParada` INTEGER NOT NULL AUTO_INCREMENT,
    `SolicitacaoViagem_idSolicitacaoViagem` INTEGER NOT NULL,
    `Viagem_idViagem` INTEGER NOT NULL,
    `endereco` VARCHAR(255) NOT NULL,

    INDEX `fk_parada_solviagem`(`SolicitacaoViagem_idSolicitacaoViagem`),
    INDEX `fk_parada_viagem`(`Viagem_idViagem`),
    PRIMARY KEY (`idParada`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PedidoConsulta` (
    `idPedidoConsulta` INTEGER NOT NULL AUTO_INCREMENT,
    `UnidadeUbs_idUnidadeUbs` INTEGER NOT NULL,
    `Solicitacao_idSolicitacao` INTEGER NOT NULL,

    INDEX `fk_pedidoconsulta_solicitacao`(`Solicitacao_idSolicitacao`),
    INDEX `fk_pedidoconsulta_unidade`(`UnidadeUbs_idUnidadeUbs`),
    PRIMARY KEY (`idPedidoConsulta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitacao` (
    `idSolicitacao` INTEGER NOT NULL AUTO_INCREMENT,
    `Usuario_idUsuario` INTEGER NOT NULL,
    `primeiro_nome_solicitante` VARCHAR(255) NOT NULL,
    `sobrenome_solicitante` VARCHAR(255) NOT NULL,
    `email_solicitante` VARCHAR(255) NOT NULL,
    `telefone_solicitante` VARCHAR(15) NOT NULL,
    `TipoSolicitacao` ENUM('VIAGEM', 'OUVIDORIA', 'CONSULTA') NOT NULL,

    INDEX `fk_solicitacao_usuario`(`Usuario_idUsuario`),
    PRIMARY KEY (`idSolicitacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SolicitacaoViagem` (
    `idSolicitacaoViagem` INTEGER NOT NULL AUTO_INCREMENT,
    `Solicitacao_idSolicitacao` INTEGER NOT NULL,
    `Acompanhante_idAcompanhante` INTEGER NULL,
    `Viagem_idViagem` INTEGER NULL,
    `endereco_paciente` VARCHAR(255) NOT NULL,
    `local_consulta` VARCHAR(255) NOT NULL,
    `cidade_consulta` VARCHAR(255) NOT NULL,
    `comprovante_url` VARCHAR(255) NULL,
    `data_consulta` DATE NOT NULL,
    `horario_consulta` TIME(0) NOT NULL,
    `StatusSolicitacao` ENUM('PENDENTE', 'CONFIRMADA', 'REALIZADA', 'CANCELADA') NOT NULL DEFAULT 'PENDENTE',

    INDEX `fk_solviagem_acomp`(`Acompanhante_idAcompanhante`),
    INDEX `fk_solviagem_solicitacao`(`Solicitacao_idSolicitacao`),
    INDEX `fk_solviagem_viagem`(`Viagem_idViagem`),
    PRIMARY KEY (`idSolicitacaoViagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Taxista` (
    `idTaxista` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_taxista` VARCHAR(255) NOT NULL,
    `telefone_taxista` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`idTaxista`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnidadeUbs` (
    `idUnidadeUbs` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_unidade` VARCHAR(255) NOT NULL,
    `endereco_unidade` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`idUnidadeUbs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `primeiroNome` VARCHAR(255) NOT NULL,
    `sobrenome` VARCHAR(255) NOT NULL,
    `cpf` CHAR(11) NOT NULL,
    `telefone` CHAR(11) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `endereco` VARCHAR(255) NOT NULL,
    `telefoneConfirmado` BOOLEAN NOT NULL DEFAULT false,
    `emailConfirmado` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Usuario_cpf_key`(`cpf`),
    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Viagem` (
    `idViagem` INTEGER NOT NULL AUTO_INCREMENT,
    `Funcionario_idFuncionario` INTEGER NOT NULL,
    `Carro_idCarro` INTEGER NOT NULL,
    `dataPartida` DATETIME(0) NOT NULL,
    `enderecoLocalPartida` VARCHAR(255) NOT NULL,

    INDEX `fk_viagem_carro`(`Carro_idCarro`),
    INDEX `fk_viagem_funcionario`(`Funcionario_idFuncionario`),
    PRIMARY KEY (`idViagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Noticia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `corpo` VARCHAR(191) NOT NULL,
    `imagemUrl` VARCHAR(191) NOT NULL,
    `autor` VARCHAR(191) NOT NULL,
    `categoria` ENUM('SAUDE', 'EDUCACAO', 'INFRAESTRUTURA', 'CULTURA', 'ESPORTE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EspecialidadeUnidadeUbs` ADD CONSTRAINT `fk_especialidade` FOREIGN KEY (`Especialidade_idEspecialidade`) REFERENCES `Especialidade`(`idEspecialidade`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `EspecialidadeUnidadeUbs` ADD CONSTRAINT `fk_unidade` FOREIGN KEY (`UnidadeUbs_idUnidadeUbs`) REFERENCES `UnidadeUbs`(`idUnidadeUbs`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Funcionario` ADD CONSTRAINT `fk_funcionario_usuario` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `FuncionarioFuncao` ADD CONSTRAINT `fk_funcfunc_funcao` FOREIGN KEY (`Funcao_idFuncao`) REFERENCES `Funcao`(`idFuncao`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `FuncionarioFuncao` ADD CONSTRAINT `fk_funcfunc_funcionario` FOREIGN KEY (`Funcionario_idFuncionario`) REFERENCES `Funcionario`(`idFuncionario`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MensagemOuvidoria` ADD CONSTRAINT `fk_msg_solicitacao` FOREIGN KEY (`Solicitacao_idSolicitacao`) REFERENCES `Solicitacao`(`idSolicitacao`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Parada` ADD CONSTRAINT `fk_parada_solviagem` FOREIGN KEY (`SolicitacaoViagem_idSolicitacaoViagem`) REFERENCES `SolicitacaoViagem`(`idSolicitacaoViagem`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Parada` ADD CONSTRAINT `fk_parada_viagem` FOREIGN KEY (`Viagem_idViagem`) REFERENCES `Viagem`(`idViagem`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PedidoConsulta` ADD CONSTRAINT `fk_pedidoconsulta_solicitacao` FOREIGN KEY (`Solicitacao_idSolicitacao`) REFERENCES `Solicitacao`(`idSolicitacao`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `PedidoConsulta` ADD CONSTRAINT `fk_pedidoconsulta_unidade` FOREIGN KEY (`UnidadeUbs_idUnidadeUbs`) REFERENCES `UnidadeUbs`(`idUnidadeUbs`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Solicitacao` ADD CONSTRAINT `fk_solicitacao_usuario` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `fk_solviagem_acomp` FOREIGN KEY (`Acompanhante_idAcompanhante`) REFERENCES `Acompanhante`(`idAcompanhante`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `fk_solviagem_solicitacao` FOREIGN KEY (`Solicitacao_idSolicitacao`) REFERENCES `Solicitacao`(`idSolicitacao`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `fk_solviagem_viagem` FOREIGN KEY (`Viagem_idViagem`) REFERENCES `Viagem`(`idViagem`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Viagem` ADD CONSTRAINT `fk_viagem_carro` FOREIGN KEY (`Carro_idCarro`) REFERENCES `Carro`(`idCarro`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Viagem` ADD CONSTRAINT `fk_viagem_funcionario` FOREIGN KEY (`Funcionario_idFuncionario`) REFERENCES `Funcionario`(`idFuncionario`) ON DELETE CASCADE ON UPDATE NO ACTION;
