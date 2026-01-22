/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUsuario]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PasswordResetToken_token_key` ON `PasswordResetToken`(`token`);

-- CreateIndex
CREATE UNIQUE INDEX `PasswordResetToken_idUsuario_key` ON `PasswordResetToken`(`idUsuario`);
