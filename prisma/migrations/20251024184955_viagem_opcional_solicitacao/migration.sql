-- DropForeignKey
ALTER TABLE `SolicitacaoViagem` DROP FOREIGN KEY `fk_SolicitacaoViagem_Viagem`;

-- AlterTable
ALTER TABLE `SolicitacaoViagem` MODIFY `Viagem_idViagem` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `fk_SolicitacaoViagem_Viagem` FOREIGN KEY (`Viagem_idViagem`) REFERENCES `Viagem`(`idViagem`) ON DELETE SET NULL ON UPDATE RESTRICT;
