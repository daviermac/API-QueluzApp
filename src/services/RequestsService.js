import prisma from "../config/prisma.js";

export async function listRequestsByUser(idUsuario) {
    if (!idUsuario) {
        throw new Error("Erro: ID de usuário não informado!")
    }

    const requests = await prisma.solicitacao.findMany({
        where: {
            Usuario_idUsuario: idUsuario
        }
    })

    return requests
}
