import prisma from "../config/prisma.js";

const public_bucket_url = process.env.PUBLIC_BUCKET_URL

export async function requestLightRepair(idUsuario, tipoProblema, descricao, enderecoTexto, referencia, latitude, longitude, imagem, primeiroNome, sobrenome, email, telefone) {
    const result = await prisma.solicitacaoReparoIluminacao.create({
        data: {
            tipoProblema,
            descricao,
            enderecoTexto,
            referencia,
            latitude,
            longitude,
            imagem_url: imagem,
            usuario: {
            connect: { idUsuario }
            },

            Solicitacao: {
            create: {
                Usuario_idUsuario: idUsuario,
                primeiro_nome_solicitante: primeiroNome,
                sobrenome_solicitante: sobrenome,
                email_solicitante: email,
                telefone_solicitante: telefone,
                TipoSolicitacao: 'REPARO_POSTE',
                criadaEm: new Date()
            }
            }
        }
        })


    return result
}

export async function getAllRequests() {
    const requestsLists = await prisma.solicitacaoReparoIluminacao.findMany({
        include: {
            usuario: true
        }
    })

    requestsLists.map(request => {
        request.imagem_url = `${public_bucket_url}/${request.imagem_url}`
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

    request.imagem_url = `${public_bucket_url}/${request.imagem_url}`

    return request
}

export async function getRequestsByUser(usuarioId) {
    if (!usuarioId) {
        throw new Error("Erro: ID de usuário não informado!")
    }

    const requests = await prisma.solicitacaoReparoIluminacao.findMany({
        where: {
            usuarioId
        }
    })

    return requests
}

export async function closeRequest() {
    
}
