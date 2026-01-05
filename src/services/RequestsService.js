import prisma from "../config/prisma.js";

export async function listRequestsByUser(idUsuario) {
    if (!idUsuario) {
        throw new Error("Erro: ID de usuário não informado!")
    }

    const requests = await prisma.solicitacao.findMany({
        where: {
            Usuario_idUsuario: idUsuario
        },
        include: {
            SolicitacaoReparoIluminacao: true,
            SolicitacaoViagem: true
        },
        orderBy: {
            criadaEm: 'desc'
        }
    })

    return requests
}

export async function cancelRequest(requestId, motive) {
    if (!requestId) {
        throw new Error("ID da solicitação é obrigatório")
    }

    if (!motive) {
        throw new Error("Motivo do cancelamento é obrigatório")
    }

    return prisma.$transaction(async (tx) => {
        const request = await tx.solicitacao.findUnique({
            where: {
                idSolicitacao: requestId
            }
        })

        if (!request) {
            throw new Error("Erro: solicitação não encontrada!")
        }

        await tx.solicitacao.update({
            where: {
                idSolicitacao: request.idSolicitacao
            },
            data: {
                motivo_cancelamento: motive
            }
        })

        let requestUpdated

        switch (request.TipoSolicitacao) {
            case 'VIAGEM':
                requestUpdated = await tx.solicitacaoViagem.update({
                    where: {
                        Solicitacao_idSolicitacao: request.idSolicitacao
                    },
                    data: {
                        statusSolicitacao: 'CANCELADA'
                    }
                })
                break

            case 'REPARO_POSTE':
                requestUpdated = await tx.solicitacaoReparoIluminacao.update({
                    where: {
                        Solicitacao_idSolicitacao: request.idSolicitacao
                    },
                    data: {
                        statusSolicitacao: 'CANCELADA'
                    }
                })
                break

            default:
                throw new Error("Tipo de solicitação inválido")
        }

        return requestUpdated
    })
}
