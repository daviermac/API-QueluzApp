/*
  Warnings:

  - The values [EM USO,EM MANUTENCAO] on the enum `Carro_StatusCarro` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Carro` MODIFY `StatusCarro` ENUM('DISPONIVEL', 'EM_USO', 'EM_MANUTENCAO') NOT NULL DEFAULT 'DISPONIVEL';
