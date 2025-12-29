import prisma from "../config/prisma.js";

export async function requestLightRepair(idUsuario, tipoProblema, descricao, enderecoTexto, referencia, latitude, longitude, imagem) {
    const request = await prisma.solicitacaoReparoIluminacao.create({
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

    return request
}

export async function getAllRequests() {
    
}

export async function getRequestById() {
    
}

export async function closeRequest() {
    
}
