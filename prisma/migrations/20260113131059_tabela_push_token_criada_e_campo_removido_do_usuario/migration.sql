/*
  Warnings:

  - You are about to drop the column `pushToken` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Usuario` DROP COLUMN `pushToken`;

-- CreateTable
CREATE TABLE `PushToken` (
    `idToken` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `plataforma` ENUM('IOS', 'ANDROID') NOT NULL,

    UNIQUE INDEX `PushToken_token_key`(`token`),
    INDEX `PushToken_usuarioId_idx`(`usuarioId`),
    PRIMARY KEY (`idToken`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PushToken` ADD CONSTRAINT `PushToken_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
