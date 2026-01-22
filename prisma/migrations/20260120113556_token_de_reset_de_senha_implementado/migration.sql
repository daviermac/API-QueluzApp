-- CreateTable
CREATE TABLE `PasswordResetToken` (
    `idToken` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiraEm` DATETIME(3) NOT NULL,
    `jaUsado` BOOLEAN NOT NULL DEFAULT false,
    `idUsuario` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idToken`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
