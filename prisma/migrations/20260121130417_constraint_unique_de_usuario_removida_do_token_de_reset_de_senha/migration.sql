-- DropForeignKey
ALTER TABLE `PasswordResetToken` DROP FOREIGN KEY `PasswordResetToken_idUsuario_fkey`;

-- DropIndex
DROP INDEX `PasswordResetToken_idUsuario_key` ON `PasswordResetToken`;

-- AddForeignKey
