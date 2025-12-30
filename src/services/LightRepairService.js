import prisma from "../config/prisma.js";

export async function requestLightRepair(idUsuario, tipoProblema, descricao, enderecoTexto, referencia, latitude, longitude, imagem, primeiroNome, sobrenome, email, telefone) {
    const lightRepairRequest = await prisma.solicitacaoReparoIluminacao.create({
        data: {
            tipoProblema,
            descricao,
            enderecoTexto,
            referencia,
            latitude,
            longitude,
            imagem_url: imagem,
            usuarioId: idUsuario,
            criadaEm: new Date()
        }   
    })

    await prisma.solicitacao.create({
        data: {
            Usuario_idUsuario: idUsuario,
            primeiro_nome_solicitante: primeiroNome,
            sobrenome_solicitante: sobrenome,
            email_solicitante: email,
            telefone_solicitante: telefone,
            TipoSolicitacao: 'REPARO_POSTE'
        }
    })

    return lightRepairRequest
}

export async function getAllRequests() {
    const requestsLists = await prisma.solicitacaoReparoIluminacao.findMany({
        include: {
            usuario: true
        }
    })

    return requestsLists
}

export async function getRequestById(requestId) {
    const request = await prisma.solicitacaoReparoIluminacao.findUnique({
        where: {
            idSolicitacaoReparo: requestId
        }
    })

    if (!request) {
        throw new Error("Erro: Nenhuma solicitação encontrada com este ID!")
    }

    return request
}

export async function closeRequest() {
    
}
