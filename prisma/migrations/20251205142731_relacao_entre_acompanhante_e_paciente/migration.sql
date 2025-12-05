-- CreateTable
CREATE TABLE `AcompanhantePaciente` (
    `Acompanhante_idAcompanhante` INTEGER NOT NULL,
    `Usuario_idUsuario` INTEGER NOT NULL,

    INDEX `AcompanhantePaciente_Usuario_idUsuario_idx`(`Usuario_idUsuario`),
    PRIMARY KEY (`Acompanhante_idAcompanhante`, `Usuario_idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AcompanhantePaciente` ADD CONSTRAINT `AcompanhantePaciente_Acompanhante_idAcompanhante_fkey` FOREIGN KEY (`Acompanhante_idAcompanhante`) REFERENCES `Acompanhante`(`idAcompanhante`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcompanhantePaciente` ADD CONSTRAINT `AcompanhantePaciente_Usuario_idUsuario_fkey` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
