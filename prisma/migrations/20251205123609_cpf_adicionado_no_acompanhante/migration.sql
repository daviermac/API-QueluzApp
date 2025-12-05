/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Acompanhante` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Acompanhante` table without a default value. This is not possible if the table is not empty.
  - Made the column `endereco` on table `Acompanhante` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `Acompanhante` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Acompanhante` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Acompanhante` ADD COLUMN `cpf` CHAR(11) NOT NULL,
    MODIFY `endereco` VARCHAR(255) NOT NULL,
    MODIFY `telefone` VARCHAR(11) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Acompanhante_cpf_key` ON `Acompanhante`(`cpf`);
