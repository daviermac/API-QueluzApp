-- DropForeignKey
ALTER TABLE `SolicitacaoViagem` DROP FOREIGN KEY `fk_SolicitacaoViagem_Acompanhante`;

-- AlterTable
ALTER TABLE `SolicitacaoViagem` MODIFY `Acompanhante_idAcompanhante` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `SolicitacaoViagem` ADD CONSTRAINT `fk_SolicitacaoViagem_Acompanhante` FOREIGN KEY (`Acompanhante_idAcompanhante`) REFERENCES `Acompanhante`(`idAcompanhante`) ON DELETE SET NULL ON UPDATE RESTRICT;
