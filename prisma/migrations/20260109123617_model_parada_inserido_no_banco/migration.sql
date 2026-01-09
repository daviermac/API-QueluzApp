/*
  Warnings:

  - Added the required column `buscado_em_casa` to the `SolicitacaoViagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SolicitacaoViagem` ADD COLUMN `buscado_em_casa` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `Parada` (
    `idParada` VARCHAR(191) NOT NULL,
    `Viagem_idViagem` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `horario` TIME(0) NOT NULL,

    INDEX `Parada_Viagem_idViagem_idx`(`Viagem_idViagem`),
    PRIMARY KEY (`idParada`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Parada` ADD CONSTRAINT `Parada_Viagem_idViagem_fkey` FOREIGN KEY (`Viagem_idViagem`) REFERENCES `Viagem`(`idViagem`) ON DELETE RESTRICT ON UPDATE CASCADE;
