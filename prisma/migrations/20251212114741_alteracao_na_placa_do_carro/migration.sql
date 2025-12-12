/*
  Warnings:

  - You are about to alter the column `placa` on the `Carro` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Char(7)`.

*/
-- AlterTable
ALTER TABLE `Carro` MODIFY `placa` CHAR(7) NOT NULL;
