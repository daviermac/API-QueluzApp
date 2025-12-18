/*
  Warnings:

  - Added the required column `horaPartida` to the `Viagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Curso` MODIFY `criado_em` DATE NOT NULL;

-- AlterTable
ALTER TABLE `Evento` MODIFY `criado_em` DATE NOT NULL;

-- AlterTable
ALTER TABLE `Noticia` MODIFY `publicadaEm` DATE NOT NULL;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `createdAt` DATE NOT NULL;

-- AlterTable
ALTER TABLE `Viagem` ADD COLUMN `horaPartida` TIME(0) NOT NULL,
    MODIFY `dataPartida` DATE NOT NULL;
