/*
  Warnings:

  - You are about to drop the column `pis` on the `Funcionario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Funcionario_pis_key` ON `Funcionario`;

-- AlterTable
ALTER TABLE `Funcionario` DROP COLUMN `pis`;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
