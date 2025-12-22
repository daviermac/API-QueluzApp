import prisma from '../config/prisma.js'
import { getSignedDownloadUrl, uploadPhotoToS3 } from '../config/S3.js'

export async function listAllEvents() {
    const events = await prisma.evento.findMany()

    const eventsWithImage = await Promise.all(
        events.map(async (req) => {
            const chamadaSignedUrl = await getSignedDownloadUrl(req.imagem_chamada)
            const capaSignedUrl = await getSignedDownloadUrl(req.imagem_capa)
            
            return {
                ...req,
                imagem_chamada_link: chamadaSignedUrl,
                imagem_capa_link: capaSignedUrl
            }
        })
    )

    return eventsWithImage
}

export async function listFirstTwoEvents() {
    const events = await prisma.evento.findMany({
        take: 2
    })

    const eventsWithImage = await Promise.all(
        events.map(async (req) => {
            const chamadaSignedUrl = await getSignedDownloadUrl(req.imagem_chamada)
            const capaSignedUrl = await getSignedDownloadUrl(req.imagem_capa)
            
            return {
                ...req,
                imagem_chamada_link: chamadaSignedUrl,
                imagem_capa_link: capaSignedUrl
            }
        })
    )

    return eventsWithImage
}

export async function listEventById(eventId) {
    if (!eventId) {
        throw new Error("Erro: !")
    }

    const event = await prisma.evento.findUnique({
        where: {
            idEvento: eventId
        }
    })

    event.chamadaSignedUrl = await getSignedDownloadUrl(event.imagem_chamada)
    event.capaSignedUrl = await getSignedDownloadUrl(event.imagem_capa)    

    return event
}

export async function createEvent(titulo, descricao, local_evento, imagem_chamada_buffer, imagem_chamada_name, imagem_capa_buffer, imagem_capa_name, criado_em, mesInicio, anoInicio, intervaloDatas) {
    if (!titulo, !descricao, !local_evento, !imagem_chamada_buffer, !imagem_chamada_name, !imagem_capa_buffer, !imagem_capa_name, !criado_em, !mesInicio, !anoInicio, !intervaloDatas) {
        throw new Error("Erro: Todos os dados devem ser informados!")
    }
    
    const imagem_chamada = await uploadPhotoToS3("events/chamada_evento", imagem_chamada_buffer, imagem_chamada_name)
    const imagem_capa = await uploadPhotoToS3("events/capa_evento", imagem_capa_buffer, imagem_capa_name)

    if (!imagem_capa || !imagem_chamada) {
        throw new Error("Erro: erro ao criar imagens!")
    }

    const event = await prisma.evento.create({
        data: {
            titulo,
            descricao,
            local_evento,
            imagem_chamada,
            imagem_capa,
            criado_em: new Date(),
            mesInicio,
            anoInicio,
            IntervaloDatas: intervaloDatas
        }
    })
    
    return event
}   

export async function deleteEvent(eventId) {
    if (!eventId) {
        throw new Error("Erro: ID de evento não informado!")
    }

    const eventExists = await prisma.evento.findUnique({
        where: {
            idEvento: eventId
        }
    })

    if (!eventExists) {
        throw new Error("Erro: Evento não existe!")
    }
    
    const event = await prisma.evento.delete({
        where: {
            idEvento: eventId
        }
    })

    return event
}

export async function inactivateEvent(eventId) {
    const event = await prisma.evento.idEvento({
        where: {
            idEvento: eventId
        }
    })

    if (!event) {
        throw new Error("Erro: Evento não existe!")
    }

    const eventUpdated = await prisma.evento.update({
        where: {
            idEvento: eventId
        },
        data: {
            ativo: false
        }
    })

    return eventUpdated
}

