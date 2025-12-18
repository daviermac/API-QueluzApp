/*
  Warnings:

  - You are about to drop the column `local_curso` on the `Curso` table. All the data in the column will be lost.
  - Added the required column `link_inscricao` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Curso` DROP COLUMN `local_curso`,
    ADD COLUMN `link_inscricao` VARCHAR(191) NOT NULL;
