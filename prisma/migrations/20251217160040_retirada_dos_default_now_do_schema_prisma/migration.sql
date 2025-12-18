/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Noticia` table. All the data in the column will be lost.
  - Added the required column `publicadaEm` to the `Noticia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Curso` ALTER COLUMN `criado_em` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Evento` ALTER COLUMN `criado_em` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Noticia` DROP COLUMN `createdAt`,
    ADD COLUMN `publicadaEm` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Usuario` ALTER COLUMN `createdAt` DROP DEFAULT;
