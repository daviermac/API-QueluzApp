-- CreateTable
CREATE TABLE `SolicitacaoReparoIluminacao` (
    `idSolicitacaoReparo` VARCHAR(191) NOT NULL,
    `tipoProblema` ENUM('POSTE_QUEIMADO', 'POSTE_PISCANDO', 'POSTE_QUEBRADO', 'OUTRO') NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `enderecoTexto` VARCHAR(191) NOT NULL,
    `referencia` VARCHAR(191) NOT NULL,
    `latitude` VARCHAR(191) NULL,
    `longitude` VARCHAR(191) NULL,
    `imagem_url` VARCHAR(191) NULL,
    `criadaEm` DATE NOT NULL,
    `statusSolicitacao` ENUM('RECEBIDA', 'ATENDIDA') NOT NULL,

    PRIMARY KEY (`idSolicitacaoReparo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
