/*
  Warnings:

  - Added the required column `imagem_principal` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Curso` ADD COLUMN `imagem_principal` VARCHAR(191) NOT NULL,
    MODIFY `descricao` LONGTEXT NOT NULL;
